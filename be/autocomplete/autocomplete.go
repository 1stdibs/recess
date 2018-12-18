package autocomplete

import (
	"fmt"

	"github.com/jhump/protoreflect/desc"
	"github.com/jhump/protoreflect/grpcreflect"
	"github.com/robrichard/recess/be/recess"
)

func GetAutocompleteData(client *grpcreflect.Client, service, method string) (*[]recess.Field, error) {
	fd, err := client.FileContainingSymbol(service)
	if err != nil {
		return nil, fmt.Errorf("couldn't find service %s: %v", service, err)
	}

	sd := fd.FindService(service)
	if sd == nil {
		return nil, fmt.Errorf("couldn't find service %s", service)
	}

	md := sd.FindMethodByName(method)
	if md == nil {
		return nil, fmt.Errorf("couldn't find method %s", method)
	}

	inputTypeDescriptor := md.GetInputType()
	fields := processMessageDescriptor(inputTypeDescriptor)

	return fields, nil
}

func processMessageDescriptor(messageDescriptor *desc.MessageDescriptor) *[]recess.Field {
	fields := messageDescriptor.GetFields()

	result := make([]recess.Field, len(fields))
	for i, field := range fields {
		message := field.GetMessageType()

		if message == nil {
			result[i] = recess.Field{Name: field.GetName()}
		} else {
			result[i] = recess.Field{
				Name:     field.GetName(),
				Children: processMessageDescriptor(message),
			}
		}
	}

	return &result
}
