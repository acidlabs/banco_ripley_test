package product

import (
	pb "development/ripley_test/proto"
)

// Product ...
type Product struct {
	UniqueID        string         `json:"uniqueID"`
	PartNumber      string         `json:"partNumber"`
	Name            string         `json:"name"`
	FullImage       string         `json:"fullImage"`
	Images          []string       `json:"images"`
	Prices          Prices         `json:"prices"`
	LongDescription string         `json:"longDescription"`
	Attributes      AttributeSlice `json:"attributes"`
	Shipping        Shipping       `json:"shipping"`
	ThumbnailImage  string         `json:"thumbnailImage"`
}

// Prices ...
type Prices struct {
	ListPrice           int64  `json:"listPrice"`
	OfferPrice          int64  `json:"offerPrice"`
	Discount            int64  `json:"discount"`
	DiscountPercentage  int64  `json:"discountPercentage"`
	RipleyPuntos        int64  `json:"ripleyPuntos"`
	FormattedListPrice  string `json:"formattedListPrice"`
	FormattedOfferPrice string `json:"formattedOfferPrice"`
	FormattedDiscount   string `json:"formattedDiscount"`
}

// Attribute ...
type Attribute struct {
	Displayable bool   `json:"displayable"`
	ID          string `json:"id"`
	Identifier  string `json:"identifier"`
	Name        string `json:"name"`
	Usage       string `json:"usage"`
	Value       string `json:"value"`
}

// AttributeSlice ...
type AttributeSlice []*Attribute

// Shipping ...
type Shipping struct {
	RTienda        bool `json:"rTienda"`
	DDomicilio     bool `json:"dDomicilio"`
	RCercano       bool `json:"rCercano"`
	CashOnDelivery bool `json:"cashOnDelivery"`
}

// Service ...
type Service interface {
	GetProduct(sku string) (*pb.Product, error)
	ListProducts() ([]*pb.Product, error)
}

// ToProto ...
func (p *Product) ToProto() *pb.Product {
	return &pb.Product{
		UniqueId:        p.UniqueID,
		PartNumber:      p.PartNumber,
		Name:            p.Name,
		FullImage:       p.FullImage,
		Images:          p.Images,
		Prices:          p.Prices.ToProto(),
		LongDescription: p.LongDescription,
		Attributes:      p.Attributes.ToProto(),
		Shipping:        p.Shipping.ToProto(),
		ThumbnailImage:  p.ThumbnailImage,
	}
}

// ToProto ...
func (p *Prices) ToProto() *pb.Prices {
	return &pb.Prices{
		ListPrice:           p.ListPrice,
		OfferPrice:          p.OfferPrice,
		Discount:            p.Discount,
		DiscountPercentage:  p.DiscountPercentage,
		RipleyPuntos:        p.RipleyPuntos,
		FormattedListPrice:  p.FormattedListPrice,
		FormattedOfferPrice: p.FormattedOfferPrice,
		FormattedDiscount:   p.FormattedDiscount,
	}
}

// ToProto ...
func (a *Attribute) ToProto() *pb.Attribute {
	return &pb.Attribute{
		Displayable: a.Displayable,
		Id:          a.ID,
		Identifier:  a.Identifier,
		Name:        a.Name,
		Usage:       a.Usage,
		Value:       a.Value,
	}
}

// ToProto ...
func (as AttributeSlice) ToProto() []*pb.Attribute {
	var attributeSlice []*pb.Attribute

	for _, v := range as {
		attributeSlice = append(attributeSlice, v.ToProto())
	}

	return attributeSlice
}

// ToProto ...
func (s *Shipping) ToProto() *pb.Shipping {
	return &pb.Shipping{
		RTienda:        s.RTienda,
		DDomicilio:     s.DDomicilio,
		RCercano:       s.RCercano,
		CashOnDelivery: s.CashOnDelivery,
	}
}
