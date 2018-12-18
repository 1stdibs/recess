package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/rs/cors"

	"github.com/robrichard/recess/be/listmethods"
	"github.com/robrichard/recess/be/listservices"
	"github.com/robrichard/recess/be/recess"
	"github.com/robrichard/recess/be/refclient"
	"github.com/robrichard/recess/be/invoke"
)

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
		errorResponse(w, "couldn't list services: %v", err)
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

	jsonResponse(w, response)
}


type invokeRequest struct {
	Server   string            `json:"server"`
	Port     string            `json:"port"`
	Service  string            `json:"service"`
	Method   string            `json:"method"`
	Metadata map[string]string `json:"metadata"`
	Body     string            `json:"body"`
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
	}
	defer refclient.CloseConnection(conn)

	resp, err := invoke.Invoke(client, conn, json.NewDecoder(strings.NewReader(request.Body)), request.Service, request.Method)
	if err != nil {
		errorResponse(w, "couldn't invoke method: %v", err)
		return
	}

	jsonResponse(w, resp)
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/services", listServicesHandler)
	mux.HandleFunc("/invoke", invokeHandler)

	handler := cors.AllowAll().Handler(mux)

	log.Fatal(http.ListenAndServe(":4444", handler))
}

func errorResponse(w http.ResponseWriter, message string, vars ...interface{}) {
	w.WriteHeader(http.StatusInternalServerError)
	fmt.Fprintf(w, message, vars...)
	fmt.Fprintln(w)
}

func jsonResponse(w http.ResponseWriter, payload interface{}) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(payload)
}
