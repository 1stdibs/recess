package invoke

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"time"

	"github.com/golang/protobuf/proto"
	"github.com/jhump/protoreflect/dynamic"
	"github.com/jhump/protoreflect/dynamic/grpcdynamic"
	"github.com/jhump/protoreflect/grpcreflect"
	"google.golang.org/grpc"
	"google.golang.org/grpc/metadata"
)

func Invoke(client *grpcreflect.Client, conn *grpc.ClientConn, decoder *json.Decoder, metadataMap map[string]string, service, method string) (interface{}, time.Duration, error) {
	fd, err := client.FileContainingSymbol(service)
	if err != nil {
		return nil, time.Second, fmt.Errorf("couldn't find service %s: %v", service, err)
	}

	sd := fd.FindService(service)
	if sd == nil {
		return nil, time.Second, fmt.Errorf("couldn't find service %s", service)
	}

	md := sd.FindMethodByName(method)
	if md == nil {
		return nil, time.Second, fmt.Errorf("couldn't find method %s", method)
	}

	messageFactory := dynamic.NewMessageFactoryWithDefaults()
	request := messageFactory.NewMessage(md.GetInputType())

	stub := grpcdynamic.NewStubWithMessageFactory(conn, messageFactory)

	err = decoder.Decode(request)
	if err != nil && err != io.EOF {
		return nil, time.Second, fmt.Errorf("couldn't decode json request body into proto message: %v", err)
	}

	ctx := metadata.NewOutgoingContext(context.Background(), metadata.New(metadataMap))

	// only implementing unary and server-streaming for now
	start := time.Now()
	var resp interface{}
	if !md.AsMethodDescriptorProto().GetServerStreaming() {
		// unary
		var err error
		resp, err = stub.InvokeRpc(ctx, md, request)
		if err != nil {
			return nil, time.Second, fmt.Errorf("unary grpc call for %q failed: %v", md.GetFullyQualifiedName(), err)
		}
	} else {
		// server-streaming
		stream, err := stub.InvokeRpcServerStream(ctx, md, request)
		if err != nil {
			return nil, time.Second, fmt.Errorf("server-streaming grpc call for %q failed: %v", md.GetFullyQualifiedName(), err)
		}

		var resps []proto.Message
		for {
			protoResp, err := stream.RecvMsg()
			if err == io.EOF {
				break
			} else if err != nil {
				return nil, time.Second, fmt.Errorf("server-streaming grpc call for %q failed while receiving messages: %v", md.GetFullyQualifiedName(), err)
			}

			resps = append(resps, protoResp)
		}

		resp = resps
	}

	elapsed := time.Since(start)

	return resp, elapsed, nil
}
