package recess

type Type struct {
	Name       string   `json:"name"`
	Fields     []Field  `json:"fields,omitempty"`
	Kind       string   `json:"kind,omitempty"`
	EnumValues []string `json:"enumValues,omitempty"`
}

type Field struct {
	Name       string `json:"name"`
	IsRepeated bool   `json:"isRepeated"`
	IsRequired bool   `json:"isRequired"`
	Type       Type   `json:"type"` // only the name should be inflated to avoid circular dependencies
}

type Method struct {
	Name      string `json:"name"`
	InputType Type   `json:"inputType"`
}

type Service struct {
	Name    string   `json:"name"`
	Methods []Method `json:"methods"`
}

type AutocompleteData struct {
	Services []Service `json:"services"`
	Types    []Type    `json:"types"`
}

// IsCamelCase is used by all requests/responses that convert proto <-> json
var IsCamelCase bool
