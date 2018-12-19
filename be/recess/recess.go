package recess

type Method struct {
	Name string `json:"name"`
	Type string `json:"type"`
}

type Service struct {
	Name    string    `json:"serviceName"`
	Methods *[]Method `json:"methods"`
}

type Field struct {
	Name     string   `json:"name"`
	Children *[]Field `json:"children,omitempty"`
}

// IsCamelCase is used by all requests/responses that convert proto <-> json
var IsCamelCase bool
