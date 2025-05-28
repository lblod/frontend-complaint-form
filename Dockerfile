FROM node:22 AS builder

LABEL maintainer="info@redpencil.io"

WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build


FROM semtech/ember-proxy-service:1.5.1

ENV STATIC_FOLDERS_REGEX="^/(assets|font|files|files-download|@appuniversum)/"

COPY --from=builder /app/dist /app
