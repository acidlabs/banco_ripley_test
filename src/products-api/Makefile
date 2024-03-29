VERSION=0.0.1
SVC=ripley-products-api

BIN=$(PWD)/bin/$(SVC)
BIN_PATH=$(PWD)/bin

GO ?= go
LDFLAGS='-extldflags "static" -X main.svcVersion=$(VERSION) -X main.svcName=$(SVC)'
TAGS=netgo -installsuffix netgo

clean c:
	@echo "[clean] Cleaning bin folder..."
	@rm -rf bin/

run r:
	@echo "[running] Running service..."
	@go run cmd/server/main.go

build b:
	@echo "[build] Building service..."
	@cd cmd/server && $(GO) build -o $(BIN) -ldflags=$(LDFLAGS) -tags $(TAGS)

build-linux bl:
	@echo "[build-linux] Building service..."
	@cd cmd/server && GOOS=linux GOARCH=amd64 $(GO) build -o $(BIN) -ldflags=$(LDFLAGS) -tags $(TAGS)

docker d: build-linux
	@echo "[docker] Building image..."
	@docker build -t $(SVC):$(VERSION) .

docker-login dl:
	@echo "[docker] Login to docker..."
	@$$(aws ecr get-login --no-include-email)

push p: docker docker-login
	@echo "[docker] pushing $(SVC):$(VERSION)"
	@docker tag $(SVC):$(VERSION) $(SVC):$(VERSION)
	@docker push $(SVC):$(VERSION)

.PHONY: clean run build docker docker-login push
