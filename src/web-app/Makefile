SVC=ripley-webapp
VERSION = 0.0.1

build b:
	@echo "[build] Building service..."
	@npm run build

run r: build
	@echo "[running] Running service..."
	@npm start

docker d:
	@echo "[docker] Building image..."
	@docker build -t $(SVC):$(VERSION) .

.PHONY: build b run r docker d
