package autocomplete

import (
	"fmt"

	"github.com/1stdibs/recess/be/camel"
	"github.com/1stdibs/recess/be/recess"
	"github.com/golang/protobuf/protoc-gen-go/descriptor"
	"github.com/jhump/protoreflect/desc"
	"github.com/jhump/protoreflect/grpcreflect"
)

func GetAutocompleteData(client *grpcreflect.Client, services []recess.Type, isCamel bool) (recess.AutocompleteData, error) {
	types := make(map[string]*recess.Type)
	autocompleteServices := make([]recess.Service, len(services))
	for serviceIndex, service := range services {
		methods := make([]recess.Method, len(service.Fields))

		for methodIndex, method := range service.Fields {
			fd, err := client.FileContainingSymbol(service.Name)
			if err != nil {
				return recess.AutocompleteData{}, fmt.Errorf("couldn't find service %s: %v", service, err)
			}

			sd := fd.FindService(service.Name)
			if sd == nil {
				return recess.AutocompleteData{}, fmt.Errorf("couldn't find service %s", service)
			}

			md := sd.FindMethodByName(method.Name)
			if md == nil {
				return recess.AutocompleteData{}, fmt.Errorf("couldn't find method %s", method)
			}

			inputTypeDescriptor := md.GetInputType()
			t := processType(inputTypeDescriptor, inputTypeDescriptor.GetFullyQualifiedName(), "MESSAGE", isCamel, nil, types)
			methods[methodIndex] = recess.Method{
				Name:      method.Name,
				InputType: t,
			}
		}

		autocompleteServices[serviceIndex] = recess.Service{
			Name:    service.Name,
			Methods: methods,
		}
	}

	typesList := make([]recess.Type, len(types))
	count := 0
	for _, v := range types {
		typesList[count] = *v
		count++
	}

	return recess.AutocompleteData{
		Services: autocompleteServices,
		Types:    typesList,
	}, nil
}

func processType(messageDescriptor *desc.MessageDescriptor, name, kind string, isCamel bool, enumValueStrings []string, types map[string]*recess.Type) recess.Type {
	if messageDescriptor == nil {
		t, ok := types[name]
		if !ok {
			t = &recess.Type{
				Name: name[5:], // removing the `TYPE_` prefix (ex. TYPE_ENUM -> ENUM)
				Kind: kind,
			}

			if kind == "ENUM" {
				t.EnumValues = enumValueStrings
			}

			types[name] = t
		}

		return *t
	}

	if t, ok := types[name]; ok {
		return *t
	}

	resultType := recess.Type{
		Name: name,
		Kind: kind,
	}

	types[name] = &resultType

	descriptorFields := messageDescriptor.GetFields()

	recessFields := make([]recess.Field, len(descriptorFields))
	for i, descriptorField := range descriptorFields {
		message := descriptorField.GetMessageType()

		var name string
		if isCamel {
			name = camel.Camel(descriptorField.GetName())
		} else {
			name = descriptorField.GetName()
		}

		var innerType recess.Type
		if message == nil {
			if descriptorField.GetType() == descriptor.FieldDescriptorProto_TYPE_ENUM {
				valueDescriptors := descriptorField.GetEnumType().GetValues()

				valueStrings := make([]string, len(valueDescriptors))
				for i, v := range valueDescriptors {
					valueStrings[i] = v.GetName()
				}

				innerType = processType(nil, descriptorField.GetEnumType().GetFullyQualifiedName(), "ENUM", isCamel, valueStrings, types)
			} else {
				innerType = processType(nil, descriptorField.GetType().String(), "SCALAR", isCamel, nil, types)
			}
		} else {
			innerType = processType(message, message.GetFullyQualifiedName(), "MESSAGE", isCamel, nil, types)
		}

		recessFields[i] = recess.Field{
			Name:       name,
			IsRepeated: descriptorField.IsRepeated(),
			Type:       recess.Type{Name: innerType.Name},
			IsRequired: descriptorField.IsRequired(),
		}
	}

	resultType.Fields = recessFields

	cleanResultType := resultType

	cleanResultType.Fields = nil

	return cleanResultType
}
