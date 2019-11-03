GO ?= go
LDFLAGS='-extldflags "static" -X main.svcVersion=$(VERSION) -X main.svcName=$(SVC)'
TAGS=netgo -installsuffix netgo

proto:
	@echo "[proto] Generating proto file..."
	@CGO_ENABLED=0 go generate ./...

.PHONY: proto

