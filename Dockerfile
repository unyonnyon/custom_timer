FROM node:14.12.0-slim AS Builder

ARG PUBLIC_ROOT

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

ENV VUE_APP_PUBLIC_ROOT=${PUBLIC_ROOT:-/}

RUN npm run build

# reverse proxy
FROM nginx:latest

RUN apt update && apt install -y vim \
    procps \
    iputils-ping \
    net-tools \
    dnsutils

COPY ./nginx/default.conf /etc/nginx/conf.d/

COPY --from=Builder /app/dist /public/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]