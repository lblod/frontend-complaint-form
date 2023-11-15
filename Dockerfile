FROM madnificent/ember:4.12.1-node_18 as builder

LABEL maintainer="info@redpencil.io"

WORKDIR /app
COPY . .
RUN npm ci
RUN ember build -prod


FROM semtech/ember-proxy-service:1.5.1

ENV STATIC_FOLDERS_REGEX "^/(assets|font|files|@appuniversum)/"

COPY --from=builder /app/dist /app
