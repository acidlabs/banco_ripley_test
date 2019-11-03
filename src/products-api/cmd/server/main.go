package main

import (
	"development/ripley_test/proto"
	"development/ripley_test/src/products-api/database"
	"fmt"
	"log"
	"net"
	"os"

	productSvc "development/ripley_test/src/products-api/rpc/product"

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		log.Fatal("Env variable PORT must be defined")
	}

	rconf := database.RedisConf{
		DB:     0,
		Server: "redis:6379",
	}

	redis, err := database.New(&rconf)
	if err != nil {
		os.Exit(1)
	}

	srv := grpc.NewServer()
	svc := productSvc.New(redis)

	proto.RegisterProductServiceServer(srv, svc)
	reflection.Register(srv)

	log.Println("Starting product service...")

	lis, err := net.Listen("tcp", fmt.Sprintf(":%v", port))
	if err != nil {
		log.Printf("Failed to list: %v", err)
		os.Exit(1)
	}

	log.Println(fmt.Sprintf("Product service running, Listening on: %v", port))

	if err := srv.Serve(lis); err != nil {
		log.Printf("Fatal to serve: %v", err)
		os.Exit(1)
	}
}
