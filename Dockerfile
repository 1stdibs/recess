FROM golang AS build-env
COPY be /src/be/
COPY build /src/build/
RUN cd /src/be && CGO_ENABLED=0 go build -a -installsuffix cgo -o ../recess-app

FROM alpine
WORKDIR /app
COPY --from=build-env /src /app/
ENTRYPOINT ["./recess-app", "-server-only"]
