package simple

import (
	product "development/ripley_test/src/products-api"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
)

// FetchProductByPartNumber ...
func FetchProductByPartNumber(partNumber string) (*product.Product, error) {
	req, err := http.NewRequest("GET", fmt.Sprintf("https://simple.ripley.cl/api/v2/products/%v", partNumber), nil)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}

	req.Header.Set("Content-Type", "application/json")

	client := http.Client{}

	res, err := client.Do(req)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}

	defer res.Body.Close()

	data, err := ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}

	var p *product.Product

	if err := json.Unmarshal(data, &p); err != nil {
		return nil, err
	}

	return p, nil
}

// FetchProductsByPartNumbers ...
func FetchProductsByPartNumbers(numbers []string) ([]*product.Product, error) {
	req, err := http.NewRequest("GET", fmt.Sprintf("https://simple.ripley.cl/api/v2/products?partNumbers=%v&format=json", strings.Join(numbers, ",")), nil)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}

	req.Header.Set("Content-Type", "application/json")

	client := http.Client{}

	res, err := client.Do(req)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}

	defer res.Body.Close()

	data, err := ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}

	var pl []*product.Product

	if err := json.Unmarshal(data, &pl); err != nil {
		return nil, err
	}

	return pl, nil
}
