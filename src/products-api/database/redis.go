package database

import (
	product "development/ripley_test/src/products-api"
	"encoding/json"
	"errors"
	"fmt"
	"strconv"
	"time"

	"github.com/gomodule/redigo/redis"
)

// Redis ...
type Redis interface {
	GetStruct(sku string) (*product.Product, error)
	SetStruct(p *product.Product) error
	Conn() *redis.Conn
}

// RedisSession ...
type RedisSession struct {
	pool   *redis.Pool
	prefix string
}

// RedisConf is the struct for base redis configuration
type RedisConf struct {
	Server string
	DB     int
}

// New creates a new Redis Pool with optional Redis Dial configurations.
func New(conf *RedisConf, options ...redis.DialOption) (*RedisSession, error) {
	s := &RedisSession{}
	if len(options) == 0 {
		options = []redis.DialOption{
			redis.DialReadTimeout(5 * time.Second),
			redis.DialWriteTimeout(time.Second),
			redis.DialConnectTimeout(time.Second),
		}
	}

	options = append(options, redis.DialDatabase(conf.DB))

	pool := &redis.Pool{
		MaxIdle:     80,
		MaxActive:   1000,
		IdleTimeout: 30 * time.Second,
		Dial: func() (redis.Conn, error) {
			c, err := redis.Dial("tcp", conf.Server, options...)
			if err != nil {
				return nil, err
			}
			return c, err
		},
		TestOnBorrow: func(c redis.Conn, t time.Time) error {
			_, err := c.Do("PING")
			return err
		},
	}
	s.pool = pool
	// when we use connection pooling
	// dialing and returning an error will be
	// with the request
	return s, nil
}

// Pool Returns the connection pool for redis
func (r *RedisSession) Pool() *redis.Pool {
	return r.pool
}

// Conn returns the connection for redis
func (r *RedisSession) Conn() *redis.Conn {
	return r.Conn()
}

// Close closes the connection pool for redis
func (r *RedisSession) Close() error {
	return r.pool.Close()
}

// SetPrefix is used to add a prefix to all keys to be used. It is useful for
// creating namespaces for each different application
func (r *RedisSession) SetPrefix(name string) {
	r.prefix = name + ":"
}

// AddPrefix ...
func (r *RedisSession) AddPrefix(name string) string {
	return r.prefix + name
}

// Do is a wrapper around redigo's redis.Do method that executes any redis
// command. Do does not support prefix support. Example usage: redis.Do("INCR",
// "counter").
func (r *RedisSession) Do(cmd string, args ...interface{}) (interface{}, error) {
	conn := r.pool.Get()
	// conn.Close() returns an error but we are already returning regarding error
	// while returning the Do(..) response
	defer conn.Close()
	return conn.Do(cmd, args...)
}

// Expire sets a timeout on a key. After the timeout has expired, the key will
// automatically be deleted. Calling Expire on a key that has already expire
// set will update the expire value.
func (r *RedisSession) Expire(key string, timeout time.Duration) error {
	seconds := strconv.Itoa(int(timeout.Seconds()))
	reply, err := redis.Int(r.Do("EXPIRE", r.AddPrefix(key), seconds))
	if err != nil {
		return err
	}

	if reply != 1 {
		return errors.New("key does not exist or the timeout could not be set")
	}

	return nil
}

// SetStruct ...
func (r *RedisSession) SetStruct(p *product.Product) error {
	if p == nil {
		fmt.Println("[REDIS][SetStruct][Error] must provide a product")
		return errors.New("must provide a product")
	}

	objectPrefix := fmt.Sprintf("product:%v", p.PartNumber)

	// serialize User object to JSON
	json, err := json.Marshal(p)
	if err != nil {
		fmt.Println(fmt.Sprintf("[REDIS][SetStruct][Error] %v", err.Error()))
		return err
	}

	// SET object
	_, err = r.Do("SET", objectPrefix, json)
	if err != nil {
		fmt.Println(fmt.Sprintf("[REDIS][SetStruct][Error] %v", err.Error()))
		return err
	}

	err = r.Expire(objectPrefix, time.Duration(2*time.Minute))
	if err != nil {
		fmt.Println(fmt.Sprintf("[REDIS][SetStruct][Error] %v", err.Error()))
		return err
	}

	fmt.Println(fmt.Sprintf("[REDIS][SetStruct][DONE] product with part number %v was saved", p.PartNumber))

	return nil
}

// GetStruct ...
func (r *RedisSession) GetStruct(sku string) (*product.Product, error) {

	objectPrefix := fmt.Sprintf("product:%v", sku)

	s, err := redis.String(r.Do("GET", objectPrefix))
	if err == redis.ErrNil {
		fmt.Println("Product does not exist")
		return nil, nil
	} else if err != nil {
		return nil, err
	}

	var product *product.Product
	err = json.Unmarshal([]byte(s), &product)

	if err != nil {
		return nil, err
	}

	return product, nil
}
