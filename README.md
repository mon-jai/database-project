# E Shop

## Setup

```sh
cp .env.example .env
docker compose create
docker compose run node npm ci
docker compose up --detach --wait postgres
# https://stackoverflow.com/a/66541303/
docker compose exec postgres psql -U postgres -c "CREATE DATABASE metabase"
docker compose run node npm run build
docker compose run node npm run seed-db
```

## Develop the app

```sh
NODE_ENV=development docker compose up
```

## Run the app

```sh
docker compose up
```
