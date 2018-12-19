package middleware

import (
	"bytes"
	"encoding/json"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"strings"

	"github.com/robrichard/recess/be/camel"
	"github.com/robrichard/recess/be/recess"
)

func Logging(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var body bytes.Buffer
		reader := io.TeeReader(r.Body, &body)

		bodyString, _ := ioutil.ReadAll(reader)

		log.Printf("%s requests %s with body `%s`", r.RemoteAddr, r.URL.String(), bodyString)

		r.Body = ioutil.NopCloser(&body)

		h.ServeHTTP(w, r)
	})
}

func CamelCaseRequest(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		camel := r.URL.Query().Get("camelCase")

		if camel == "true" || camel == "y" || camel == "Y" {
			recess.IsCamelCase = true

			var request map[string]interface{}
			json.NewDecoder(r.Body).Decode(&request)
			request["body"] = camelCaseFieldNames(request["body"], true)

			var stringBuilder strings.Builder
			json.NewEncoder(&stringBuilder).Encode(request)

			bodyString := stringBuilder.String()

			r.Body = ioutil.NopCloser(strings.NewReader(bodyString))
			r.ContentLength = int64(len(bodyString))

			collectingResponseWriter := newCollectingResponseWriter(w)
			h.ServeHTTP(&collectingResponseWriter, r)

			var response interface{}
			json.NewDecoder(strings.NewReader(collectingResponseWriter.Response)).Decode(&response)
			response = camelCaseFieldNames(response, false)

			var responseStringBuilder strings.Builder
			json.NewEncoder(&responseStringBuilder).Encode(response)

			responseBodyString := responseStringBuilder.String()
			w.Write([]byte(responseBodyString))
		} else {
			h.ServeHTTP(w, r)
		}
	})
}

func camelCaseFieldNames(v interface{}, underscore bool) interface{} {
	object, ok := v.(map[string]interface{})
	if !ok {
		// not another json object
		// maybe a list

		list, ok := v.([]interface{})
		if !ok {
			return v
		}

		for i, element := range list {
			list[i] = camelCaseFieldNames(element, underscore)
		}

		return list
	}

	camelCaseObject := make(map[string]interface{})

	for k, v := range object {
		if underscore {
			camelCaseObject[camel.Underscore(k)] = camelCaseFieldNames(v, underscore)
		} else {
			camelCaseObject[camel.Camel(k)] = camelCaseFieldNames(v, underscore)
		}
	}

	return camelCaseObject
}

type collectingResponseWriter struct {
	otherResponseWriter http.ResponseWriter
	Response            string
}

func newCollectingResponseWriter(otherResponseWriter http.ResponseWriter) collectingResponseWriter {
	return collectingResponseWriter{otherResponseWriter: otherResponseWriter}
}

func (c *collectingResponseWriter) Header() http.Header {
	return c.otherResponseWriter.Header()
}

func (c *collectingResponseWriter) Write(data []byte) (int, error) {
	c.Response = c.Response + string(data)
	return len(data), nil
}

func (c *collectingResponseWriter) WriteHeader(statusCode int) {
	c.otherResponseWriter.WriteHeader(statusCode)
}
