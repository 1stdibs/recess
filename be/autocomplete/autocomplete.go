package autocomplete

import (
	"fmt"

	"github.com/jhump/protoreflect/desc"
	"github.com/jhump/protoreflect/grpcreflect"
	"github.com/robrichard/recess/be/camel"
	"github.com/robrichard/recess/be/recess"

	"github.com/golang/protobuf/protoc-gen-go/descriptor"
)

func GetAutocompleteData(client *grpcreflect.Client, service, method string, isCamel bool) (*[]recess.Field, error) {
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
	fields := processMessageDescriptor(inputTypeDescriptor, isCamel)

	return fields, nil
}

func processMessageDescriptor(messageDescriptor *desc.MessageDescriptor, isCamel bool) *[]recess.Field {
	fields := messageDescriptor.GetFields()

	result := make([]recess.Field, len(fields))
	for i, field := range fields {
		message := field.GetMessageType()

		var name string
		if isCamel {
			name = camel.Camel(field.GetName())
		} else {
			name = field.GetName()
		}

		result[i] = recess.Field{
			Name:       name,
			IsRepeated: field.IsRepeated(),
			Type:       field.GetType().String(),
			IsRequired: field.IsRequired(),
		}

		if field.GetType() == descriptor.FieldDescriptorProto_TYPE_ENUM {
			valueDescriptors := field.GetEnumType().GetValues()

			valueStrings := make([]string, len(valueDescriptors))
			for i, v := range valueDescriptors {
				valueStrings[i] = v.GetName()
			}

			result[i].EnumValues = valueStrings
		}

		if message != nil {
			result[i].Children = processMessageDescriptor(message, isCamel)
		}
	}

	return &result
}
