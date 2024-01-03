# E Shop

## Setup

```sh
docker compose create
docker compose run node npm ci
docker compose up --detach --wait postgres
# https://stackoverflow.com/a/66541303/
docker compose exec postgres psql -U postgres -c "CREATE DATABASE metabase"
docker compose run node npm run build
```

## Run the app

```sh
docker compose up
```
