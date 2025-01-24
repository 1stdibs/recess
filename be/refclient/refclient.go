package refclient

import (
	"context"
	"fmt"

	"crypto/tls"
	"github.com/jhump/protoreflect/grpcreflect"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
	reflectpb "google.golang.org/grpc/reflection/grpc_reflection_v1alpha"
)

func GetRefClient(server, port string, ssl bool) (*grpcreflect.Client, *grpc.ClientConn, error) {
	creds := grpc.WithInsecure()
	if ssl {
		creds = grpc.WithTransportCredentials(
			credentials.NewTLS(&tls.Config{InsecureSkipVerify: false}),
		)
	}

	conn, err := grpc.Dial(fmt.Sprintf("%s:%s", server, port), creds)

	if err != nil {
		return nil, nil, fmt.Errorf("couldn't connect to [%s:%s]: %v", server, port, err)
	}

	refClient := grpcreflect.NewClient(context.Background(), reflectpb.NewServerReflectionClient(conn))

	return refClient, conn, nil
}

func CloseConnection(client *grpc.ClientConn) {
	client.Close()
}
