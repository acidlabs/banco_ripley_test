FROM alpine

RUN apk add --update ca-certificates

WORKDIR /src/auth-api

COPY bin/ripley-auth-api /usr/bin/ripley-auth-api

EXPOSE 3060

CMD ["/bin/sh", "-l", "-c", "ripley-auth-api"]