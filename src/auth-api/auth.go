package auth

import (
	pb "development/ripley_test/proto"
)

// Token ...
type Token struct {
	ExpiresIn    string `json:"expires_in"`
	RefreshToken string `json:"refresh_token"`
	IDToken      string `json:"id_token"`
}

// Service ...
type Service interface {
	Login(email string, password string) (*Token, error)
	Signup(email string, password string) (*Token, error)
	VerifyToken(token string) (*Token, error)
}

// ToProto ...
func (t *Token) ToProto() *pb.Token {
	return &pb.Token{
		IdToken:      t.IDToken,
		RefreshToken: t.RefreshToken,
		ExpiresIn:    t.ExpiresIn,
	}
}
