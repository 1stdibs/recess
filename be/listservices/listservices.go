package listservices

import (
	"fmt"

	"github.com/jhump/protoreflect/grpcreflect"
)

// ListServices returns a slice of all services hosted at a given server:port
func ListServices(client *grpcreflect.Client) ([]string, error) {
	services, err := client.ListServices()
	if err != nil {
		return nil, fmt.Errorf("couldn't list services: %v", err)
	}

	return services, nil
}
