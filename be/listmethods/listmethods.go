package listmethods

import (
	"fmt"

	"github.com/1stdibs/recess/be/recess"
	"github.com/jhump/protoreflect/grpcreflect"
)

func ListMethods(client *grpcreflect.Client, service string) ([]recess.Field, error) {
	fd, err := client.FileContainingSymbol(service)
	if err != nil {
		return nil, fmt.Errorf("couldn't find service %s: %v", service, err)
	}

	serviceDescriptor := fd.FindService(service)

	if serviceDescriptor == nil {
		return nil, fmt.Errorf("couldn't find %s in file", service)
	}

	methods := serviceDescriptor.GetMethods()

	result := make([]recess.Field, len(methods))
	for i, m := range methods {
		result[i] = recess.Field{
			Name: m.GetName(),
			Type: recess.Type{
				Name: m.GetFullyQualifiedName(),
				Kind: getKindName(m.IsClientStreaming(), m.IsServerStreaming()),
			},
		}
	}

	return result, nil
}

func getKindName(isClientStreaming, isServerStreaming bool) string {
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
