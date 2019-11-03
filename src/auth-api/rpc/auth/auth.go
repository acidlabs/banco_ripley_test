package auth

import (
	"context"
	pb "development/ripley_test/proto"
	"development/ripley_test/src/auth-api"
	"development/ripley_test/src/auth-api/service"
	"log"
)

var _ pb.AuthServiceServer = (*Service)(nil)

// Service ...
type Service struct {
	AuthSvc auth.Service
}

// New ...
func New() *Service {
	return &Service{
		AuthSvc: service.New(),
	}
}

// Login ...
func (ps *Service) Login(ctx context.Context, gr *pb.LoginRequest) (*pb.LoginResponse, error) {
	email := gr.GetEmail()
	pwd := gr.GetPassword()

	log.Printf("[AuthService][Login][Request] email = %v password %v", email, pwd)

	token, err := ps.AuthSvc.Login(email, pwd)
	if err != nil {
		log.Printf("[AuthService][Login][Error] err = %v", err)
		return &pb.LoginResponse{
			Data: nil,
			Error: &pb.Error{
				Code:    400,
				Message: err.Error(),
			},
		}, nil
	}

	res := &pb.LoginResponse{
		Data:  token.ToProto(),
		Error: nil,
	}

	log.Printf("[AuthService][Login][Response] res = %v", res)
	return res, nil
}

// Signup ...
func (ps *Service) Signup(ctx context.Context, gr *pb.SignupRequest) (*pb.SignupResponse, error) {
	email := gr.GetEmail()
	pwd := gr.GetPassword()

	log.Printf("[AuthService][Signup][Request] email = %v password = %v", email, pwd)

	token, err := ps.AuthSvc.Signup(email, pwd)
	if err != nil {
		log.Printf("[AuthService][Signup][Error] err = %v", err)
		return &pb.SignupResponse{
			Data: nil,
			Error: &pb.Error{
				Code:    400,
				Message: err.Error(),
			},
		}, nil
	}

	res := &pb.SignupResponse{
		Data:  token.ToProto(),
		Error: nil,
	}

	log.Printf("[AuthService][Signup][Response] res = %v", res)
	return res, nil
}

// VerifyToken ...
func (ps *Service) VerifyToken(ctx context.Context, gr *pb.VerifyTokenRequest) (*pb.VerifyTokenResponse, error) {
	token := gr.GetToken()
	log.Printf("[AuthService][VerifyToken][Request] token = %v", token)

	t, err := ps.AuthSvc.VerifyToken(token)
	if err != nil {
		log.Printf("[AuthService][VerifyToken][Error] err = %v", err)
		return &pb.VerifyTokenResponse{
			Data: nil,
			Error: &pb.Error{
				Code:    400,
				Message: err.Error(),
			},
		}, nil
	}

	res := &pb.VerifyTokenResponse{
		Data:  t.ToProto(),
		Error: nil,
	}

	log.Printf("[AuthService][VerifyToken][Response] res = %v", res)
	return res, nil
}
