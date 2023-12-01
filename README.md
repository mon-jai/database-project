# E Shop

## Setup

```sh
docker compose create
docker compose run node npm ci
docker compose up --detach --wait postgres
docker compose run node npm run build
```

## Run the app

```sh
docker-compose up
```
