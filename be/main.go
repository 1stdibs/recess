package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os/exec"
	"runtime"
	"strings"

	"github.com/rs/cors"

	"github.com/robrichard/recess/be/autocomplete"
	"github.com/robrichard/recess/be/invoke"
	"github.com/robrichard/recess/be/listmethods"
	"github.com/robrichard/recess/be/listservices"
	"github.com/robrichard/recess/be/middleware"
	"github.com/robrichard/recess/be/recess"
	"github.com/robrichard/recess/be/refclient"
)

var nofe = flag.Bool("nofe", false, "set to true if you don't want to load the front end")
var port = flag.String("port", "80", "set the port")
var serverOnly = flag.Bool("server-only", false, "set to true if you don't want to automatically load the browser")

func listServicesHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		errorResponse(w, "this endpoint only accepts GET requests")
		return
	}

	server := r.URL.Query().Get("server")
	port := r.URL.Query().Get("port")

	if server == "" || port == "" {
		errorResponse(w, "request must contain server and port query params")
		return
	}

	client, conn, err := refclient.GetRefClient(server, port)
	if err != nil {
		errorResponse(w, "couldn't get grpc reflection client: %v", err)
	}
	defer refclient.CloseConnection(conn)

	services, err := listservices.ListServices(client)
	if err != nil {
		errorResponseWithStatusCode(w, http.StatusNotFound, "couldn't list services: %v", err)
		return
	}

	response := make([]recess.Service, len(services))
	for i, s := range services {
		response[i].Name = s
		methods, err := listmethods.ListMethods(client, s)
		if err != nil {
			errorResponse(w, "couldn't get methods for %s: %v", s, err)
			return
		}

		response[i].Methods = methods
	}

	autocompleteData := r.URL.Query().Get("autocompleteData")
	if autocompleteData == "y" || autocompleteData == "Y" || autocompleteData == "true" {
		camelQuery := r.URL.Query().Get("camelCase")
		var isCamel bool
		if camelQuery == "y" || camelQuery == "Y" || camelQuery == "true" {
			isCamel = true
		}
		for _, service := range response {
			for _, method := range service.Methods {
				fields, err := autocomplete.GetAutocompleteData(client, service.Name, method.Name, isCamel)
				if err != nil {
					errorResponse(w, "couldn't get autocomplete data: %v", err)
					return
				}

				method.Fields = fields
			}
		}
	}

	jsonResponse(w, response)
}

type invokeRequest struct {
	Server   string            `json:"server"`
	Port     string            `json:"port"`
	Service  string            `json:"service"`
	Method   string            `json:"method"`
	Metadata map[string]string `json:"metadata"`
	Body     json.RawMessage   `json:"body"`
}

func invokeHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		errorResponse(w, "this endpoint only accepts POST requests")
		return
	}

	var request invokeRequest
	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		errorResponse(w, "couldn't decode POST body: %v", err)
		return
	}

	if request.Server == "" || request.Port == "" || request.Service == "" || request.Method == "" {
		errorResponse(w, "server, port, service and method are required in POST body")
		return
	}

	client, conn, err := refclient.GetRefClient(request.Server, request.Port)
	if err != nil {
		errorResponse(w, "couldn't get grpc reflection client: %v", err)
		return
	}
	defer refclient.CloseConnection(conn)

	resp, duration, err := invoke.Invoke(client, conn, json.NewDecoder(strings.NewReader(string(request.Body))), request.Metadata, request.Service, request.Method)
	if err != nil {
		errorResponse(w, "couldn't invoke method: %v", err)
		return
	}

	respWithDuration := struct {
		Response        interface{} `json:"response"`
		GRPCRequestTime int64       `json:"grpcRequestTime"`
	}{
		Response:        resp,
		GRPCRequestTime: duration.Nanoseconds() / 1e6,
	}

	jsonResponse(w, respWithDuration)
}

type autocompleteDataRequest struct {
	Server  string `json:"server"`
	Port    string `json:"port"`
	Service string `json:"service"`
	Method  string `json:"method"`
}

func autocompleteDataHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		errorResponse(w, "this endpoint only accepts POST requests")
		return
	}

	var request autocompleteDataRequest
	json.NewDecoder(r.Body).Decode(&request)

	client, conn, err := refclient.GetRefClient(request.Server, request.Port)
	if err != nil {
		errorResponse(w, "couldn't get grpc reflection client: %v", err)
	}
	defer refclient.CloseConnection(conn)

	camelQuery := r.URL.Query().Get("camelCase")
	var isCamel bool
	if camelQuery == "y" || camelQuery == "Y" || camelQuery == "true" {
		isCamel = true
	}

	fields, err := autocomplete.GetAutocompleteData(client, request.Service, request.Method, isCamel)
	if err != nil {
		errorResponse(w, "couldn't parse fields for %s/%s: %v", request.Service, request.Method, err)
		return
	}

	jsonResponse(w, fields)
}

func healthCheckHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "200")
}

func main() {
	flag.Parse()

	// be server
	mux := http.NewServeMux()
	mux.Handle("/services", middleware.Logging(http.HandlerFunc(listServicesHandler)))
	mux.Handle("/invoke", middleware.Logging(middleware.CamelCaseRequest(http.HandlerFunc(invokeHandler))))
	mux.Handle("/autocompleteData", middleware.Logging(http.HandlerFunc(autocompleteDataHandler)))
	mux.Handle("/health", middleware.Logging(http.HandlerFunc(healthCheckHandler)))

	// fe server
	if !*nofe {
		fs := http.FileServer(http.Dir("build/"))
		mux.Handle("/", fs)
		if !*serverOnly {
			openbrowser("http://localhost:" + *port)
		}
	}

	handler := cors.AllowAll().Handler(mux)

	log.Fatal(http.ListenAndServe(":"+*port, handler))
}

func errorResponse(w http.ResponseWriter, message string, vars ...interface{}) {
	errorResponseWithStatusCode(w, http.StatusInternalServerError, message, vars...)
}

func errorResponseWithStatusCode(w http.ResponseWriter, statusCode int, message string, vars ...interface{}) {
	log.Printf(message, vars...)
	w.WriteHeader(statusCode)
	jsonResponse(w, struct {
		Message string `json:"message"`
	}{
		Message: fmt.Sprintf(message, vars...),
	})
}

func jsonResponse(w http.ResponseWriter, payload interface{}) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(payload)
}

// https://gist.github.com/hyg/9c4afcd91fe24316cbf0
func openbrowser(url string) {
	var err error

	switch runtime.GOOS {
	case "linux":
		err = exec.Command("xdg-open", url).Start()
	case "windows":
		err = exec.Command("rundll32", "url.dll,FileProtocolHandler", url).Start()
	case "darwin":
		err = exec.Command("open", url).Start()
	default:
		err = fmt.Errorf("unsupported platform")
	}
	if err != nil {
		log.Fatal(err)
	}
}
