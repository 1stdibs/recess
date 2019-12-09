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

func Invoke(client *grpcreflect.Client, conn *grpc.ClientConn, decoder *json.Decoder, metadataMap map[string]string, service, method string) (interface{}, time.Duration, int, bool, error) {
	fd, err := client.FileContainingSymbol(service)
	if err != nil {
		return nil, time.Second, -1, false, fmt.Errorf("couldn't find service %s: %v", service, err)
	}

	sd := fd.FindService(service)
	if sd == nil {
		return nil, time.Second, -1, false, fmt.Errorf("couldn't find service %s", service)
	}

	md := sd.FindMethodByName(method)
	if md == nil {
		return nil, time.Second, -1, false, fmt.Errorf("couldn't find method %s", method)
	}

	messageFactory := dynamic.NewMessageFactoryWithDefaults()
	request := messageFactory.NewMessage(md.GetInputType())

	stub := grpcdynamic.NewStubWithMessageFactory(conn, messageFactory)

	err = decoder.Decode(request)
	if err != nil && err != io.EOF {
		return nil, time.Second, -1, false, fmt.Errorf("couldn't decode json request body into proto message: %v", err)
	}

	ctx := metadata.NewOutgoingContext(context.Background(), metadata.New(metadataMap))

	// only implementing unary and server-streaming for now
	start := time.Now()
	var resp interface{}
	var size int
	isError := false
	if !md.AsMethodDescriptorProto().GetServerStreaming() {
		// unary
		var err error
		protoResp, err := stub.InvokeRpc(ctx, md, request)
		if err != nil {
			resp = err.Error()
			isError = true
			size = -1
		} else {
			resp = protoResp
			size = proto.Size(protoResp)
		}
	} else {
		// server-streaming
		stream, err := stub.InvokeRpcServerStream(ctx, md, request)
		if err != nil {
			resp = err.Error()
			isError = true
			size = -1
		} else {
			var resps []proto.Message
			size = 0
			for {
				protoResp, err := stream.RecvMsg()
				if err == io.EOF {
					break
				} else if err != nil {
					return nil, time.Second, -1, false, fmt.Errorf("server-streaming grpc call for %q failed while receiving messages: %v", md.GetFullyQualifiedName(), err)
				}

				size = size + proto.Size(protoResp)
				resps = append(resps, protoResp)
			}

			resp = resps
		}
	}

	elapsed := time.Since(start)

	return resp, elapsed, size, isError, nil
}
