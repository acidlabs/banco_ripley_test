package product

import (
	"context"
	pb "development/ripley_test/proto"
	product "development/ripley_test/src/products-api"
	"development/ripley_test/src/products-api/database"
	"development/ripley_test/src/products-api/service"
	"fmt"
)

var _ pb.ProductServiceServer = (*Service)(nil)

// Service ...
type Service struct {
	ProductSvc product.Service
}

// New ...
func New(store database.Redis) *Service {
	return &Service{
		ProductSvc: service.New(store),
	}
}

// GetProduct ...
func (ps *Service) GetProduct(ctx context.Context, gr *pb.GetProductRequest) (*pb.GetProductResponse, error) {
	sku := gr.GetSku()
	fmt.Println(fmt.Sprintf("[ProductService][GetProduct][Request] sku = %v", sku))

	if sku == "" {
		fmt.Println("[ProductService][GetProduct][Error] Bad request. Must provide a valid sku")
		return &pb.GetProductResponse{
			Data: nil,
			Error: &pb.Error{
				Code:    400,
				Message: "Bad request. Must provide a valid sku",
			},
		}, nil
	}

	p, err := ps.ProductSvc.GetProduct(sku)
	if err != nil {
		fmt.Println(fmt.Sprintf("[ProductService][GetProduct][Error] %v", err.Error()))
		return &pb.GetProductResponse{
			Data: nil,
			Error: &pb.Error{
				Code:    500,
				Message: fmt.Sprintf("[ProductService][GetProduct][Error] %v", err.Error()),
			},
		}, nil
	}

	res := &pb.GetProductResponse{
		Data:  p,
		Error: nil,
	}

	fmt.Println(fmt.Sprintf("[ProductService][GetProduct][Response] %v", res))
	return res, nil
}

// ListProducts ...
func (ps *Service) ListProducts(ctx context.Context, gr *pb.Empty) (*pb.ListProductsResponse, error) {
	fmt.Println("[ProductService][ListProducts][Request] Empty")

	pl, err := ps.ProductSvc.ListProducts()
	if err != nil {
		fmt.Println(fmt.Sprintf("[ProductService][ListProducts][Error] %v", err.Error()))
		return &pb.ListProductsResponse{
			Data: nil,
			Error: &pb.Error{
				Code:    500,
				Message: fmt.Sprintf("[ProductService][ListProducts][Error] %v", err.Error()),
			},
		}, nil
	}

	res := &pb.ListProductsResponse{
		Data:  pl,
		Error: nil,
	}

	fmt.Println(fmt.Sprintf("[ProductService][ListProducts][Response] %v", res))
	return res, nil
}
