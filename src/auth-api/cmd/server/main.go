package main

import (
	"development/ripley_test/proto"
	"fmt"
	"log"
	"net"
	"os"

	authSvc "development/ripley_test/src/auth-api/rpc/auth"

	"google.golang.org/grpc/reflection"

	"google.golang.org/grpc"
)

func main() {
	port := os.Getenv("AUTH_PORT")
	if port == "" {
		log.Fatal("Env variable AUTH_PORT must be defined")
	}

	key := os.Getenv("FIREBASE_API_KEY")
	if key == "" {
		log.Fatal("Env variable FIREBASE_API_KEY must be defined")
	}

	srv := grpc.NewServer()
	svc := authSvc.New()

	proto.RegisterAuthServiceServer(srv, svc)
	reflection.Register(srv)

	log.Println("Starting auth service...")

	lis, err := net.Listen("tcp", fmt.Sprintf(":%v", port))
	if err != nil {
		log.Printf("Failed to list: %v", err)
		os.Exit(1)
	}

	log.Println(fmt.Sprintf("Auth service running, Listening on: %v", port))

	if err := srv.Serve(lis); err != nil {
		log.Printf("Fatal to serve: %v", err)
		os.Exit(1)
	}
}
