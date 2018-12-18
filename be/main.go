package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/robrichard/recess/be/listmethods"
	"github.com/robrichard/recess/be/listservices"
	"github.com/robrichard/recess/be/recess"
	"github.com/robrichard/recess/be/refclient"
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

func main() {
	http.HandleFunc("/services", listServicesHandler)
	log.Fatal(http.ListenAndServe(":4444", nil))
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
