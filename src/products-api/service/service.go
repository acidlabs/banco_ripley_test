package service

import (
	pb "development/ripley_test/proto"
	"development/ripley_test/src/products-api/database"
	"development/ripley_test/src/products-api/simple"
)

// ProductSvc ...
type ProductSvc struct {
	Store database.Redis
}

// New ...
func New(store database.Redis) *ProductSvc {
	return &ProductSvc{
		Store: store,
	}
}

// GetProduct ...
func (ps *ProductSvc) GetProduct(sku string) (*pb.Product, error) {
	p, err := ps.Store.GetStruct(sku)
	if err != nil {
		return nil, err
	}

	if p == nil {
		p, err = simple.FetchProductByPartNumber(sku)
		if err != nil {
			return nil, err
		}

		err = ps.Store.SetStruct(p)
		if err != nil {
			return nil, err
		}
	}
	return p.ToProto(), nil
}

// ListProducts ...
func (ps ProductSvc) ListProducts() ([]*pb.Product, error) {
	numbers := []string{"2000371667503P", "MPM00000515965", "2000376584805P", "2000363222529P", "2000374695626P", "2000374341127P", "535811", "MPM00004438714"}
	pl, err := simple.FetchProductsByPartNumbers(numbers)
	if err != nil {
		return nil, err
	}

	list := make([]*pb.Product, 0)

	for _, p := range pl {
		list = append(list, p.ToProto())
	}

	return list, nil
}
