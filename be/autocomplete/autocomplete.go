package autocomplete

import (
	"fmt"

	"github.com/1stdibs/recess/be/camel"
	"github.com/1stdibs/recess/be/recess"
	"github.com/jhump/protoreflect/desc"
	"github.com/jhump/protoreflect/grpcreflect"

	"github.com/golang/protobuf/protoc-gen-go/descriptor"
)

func GetAutocompleteData(client *grpcreflect.Client, service, method string, isCamel bool) ([]*recess.Field, error) {
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
	fields, err := processMessageDescriptor(inputTypeDescriptor, isCamel)
	if err != nil {
		return nil, err
	}

	return fields, nil
}

func processMessageDescriptor(messageDescriptor *desc.MessageDescriptor, isCamel bool) ([]*recess.Field, error) {
	return _processMessageDescriptor(messageDescriptor, isCamel, make(map[string]bool))
}

func _processMessageDescriptor(messageDescriptor *desc.MessageDescriptor, isCamel bool, alreadySeen map[string]bool) ([]*recess.Field, error) {
	if alreadySeen[messageDescriptor.GetFullyQualifiedName()] {
		return nil, fmt.Errorf("message %s not supported due to infinite field loop", messageDescriptor.GetFullyQualifiedName())
	}

	alreadySeen[messageDescriptor.GetFullyQualifiedName()] = true

	fields := messageDescriptor.GetFields()

	result := make([]*recess.Field, len(fields))
	for i, field := range fields {
		message := field.GetMessageType()

		var name string
		if isCamel {
			name = camel.Camel(field.GetName())
		} else {
			name = field.GetName()
		}

		result[i] = &recess.Field{
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
			var err error
			result[i].Children, err = _processMessageDescriptor(message, isCamel, alreadySeen)
			if err != nil {
				return nil, err
			}
		}
	}

	return result, nil
}
