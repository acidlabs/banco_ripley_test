GO ?= go
LDFLAGS='-extldflags "static" -X main.svcVersion=$(VERSION) -X main.svcName=$(SVC)'
TAGS=netgo -installsuffix netgo

GRAFANA_ISTIO_NAME=$(shell kubectl -n istio-system get pod -l app=grafana -o jsonpath='{.items[0].metadata.name}')
JAEGER_ISTIO_NAME=$(shell kubectl -n istio-system get pod -l app=jaeger -o jsonpath='{.items[0].metadata.name}')
KIALI_ISTIO_NAME=$(shell kubectl -n istio-system get pod -l app=kiali -o jsonpath='{.items[0].metadata.name}')
PROMETHEUS_ISTIO_NAME=$(shell kubectl -n istio-system get pod -l app=prometheus -o jsonpath='{.items[0].metadata.name}')
KIBANA_ISTIO_NAME=$(shell kubectl -n logging get pod -l app=kibana -o jsonpath='{.items[0].metadata.name}')

grafana g:
	@echo "opening grafana"
	@open http://localhost:3000/dashboard/db/istio-mesh-dashboard
	@kubectl -n istio-system port-forward $(GRAFANA_ISTIO_NAME) 3000:3000

jaeger j:
	@echo "opening jaeger"
	@open http://localhost:15032
	@kubectl -n istio-system port-forward $(JAEGER_ISTIO_NAME) 15032:16686
	
kiali k:
	@echo "opening kiali"
	@open http://localhost:20001/kiali/console
	@kubectl -n istio-system port-forward $(KIALI_ISTIO_NAME) 20001:20001

prometheus p:
	@echo "opening prometheus"
	@open http://localhost:9090/graph
	@kubectl -n istio-system port-forward $(PROMETHEUS_ISTIO_NAME) 9090:9090

kibana ki:
	@echo "opening kibana"
	@open http://localhost:5601/
	@kubectl -n logging port-forward $(KIBANA_ISTIO_NAME) 5601:5601

proto:
	@echo "[proto] Generating proto file..."
	@CGO_ENABLED=0 go generate ./...

.PHONY: proto grafana jaeger kiali prometheus kibana

