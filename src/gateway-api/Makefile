SVC=ripley-gateway-api
VERSION := $$(cat package.json | grep version | sed 's/"/ /g' | awk {'print $$3'})

build b:
	@echo "[build] Building service..."
	@npm run build

run r:
	@echo "[running] Running service..."
	@npm start

docker d:
	@echo "[docker] Building image..."
	@docker build -t $(SVC):$(VERSION) .

.PHONY: build run docker