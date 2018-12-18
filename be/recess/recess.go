package recess

type Method struct {
	Name string `json:"name"`
	Type string `json:"type"`
}

type Service struct {
	Name    string    `json:"serviceName"`
	Methods *[]Method `json:"methods"`
}
