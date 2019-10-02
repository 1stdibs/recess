package listmethods

import (
	"fmt"

	"github.com/jhump/protoreflect/grpcreflect"
	"github.com/1stdibs/recess/be/recess"
)

func ListMethods(client *grpcreflect.Client, service string) ([]*recess.Method, error) {
	fd, err := client.FileContainingSymbol(service)
	if err != nil {
		return nil, fmt.Errorf("couldn't find service %s: %v", service, err)
	}

	serviceDescriptor := fd.FindService(service)

	if serviceDescriptor == nil {
		return nil, fmt.Errorf("couldn't find %s in file", service)
	}

	methods := serviceDescriptor.GetMethods()

	result := make([]*recess.Method, len(methods))
	for i, m := range methods {
		result[i] = &recess.Method{
			Name: m.GetName(),
			Type: getTypeName(m.IsClientStreaming(), m.IsServerStreaming()),
		}
	}

	return result, nil
}

func getTypeName(isClientStreaming, isServerStreaming bool) string {
	if isClientStreaming && isServerStreaming {
		return "bidi_streaming"
	} else if isClientStreaming && !isServerStreaming {
		return "client_streaming"
	} else if !isClientStreaming && isServerStreaming {
		return "server_streaming"
	} else {
		return "unary"
	}
}
