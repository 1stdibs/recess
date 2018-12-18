package refclient

import (
	"context"
	"fmt"

	"github.com/jhump/protoreflect/grpcreflect"
	"google.golang.org/grpc"
	reflectpb "google.golang.org/grpc/reflection/grpc_reflection_v1alpha"
)

func GetRefClient(server, port string) (*grpcreflect.Client, *grpc.ClientConn, error) {
	conn, err := grpc.Dial(fmt.Sprintf("%s:%s", server, port), grpc.WithInsecure())
	if err != nil {
		return nil, nil, fmt.Errorf("couldn't connect to [%s:%s]: %v", server, port, err)
	}

	refClient := grpcreflect.NewClient(context.Background(), reflectpb.NewServerReflectionClient(conn))

	return refClient, conn, nil
}

func CloseConnection(client *grpc.ClientConn) {
	client.Close()
}
