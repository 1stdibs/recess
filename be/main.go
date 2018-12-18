package main

import (
	"context"
	"log"

	"github.com/jhump/protoreflect/grpcreflect"
	"google.golang.org/grpc"
	reflectpb "google.golang.org/grpc/reflection/grpc_reflection_v1alpha"
)

func main() {
	conn, err := grpc.Dial(":1234")
	if err != nil {
		log.Fatal("couldn't dial: ", err)
	}
	refClient := grpcreflect.NewClient(context.Background(), reflectpb.NewServerReflectionClient(conn))
}
