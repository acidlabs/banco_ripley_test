FROM alpine

RUN apk add --update ca-certificates

WORKDIR /src/products-api

COPY bin/ripley-products-api /usr/bin/ripley-products-api

EXPOSE 3060

CMD ["/bin/sh", "-l", "-c", "ripley-products-api"]