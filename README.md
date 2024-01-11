# E Shop

## Setup

On a Windows machine,

- Install Windows Subsystem for Linux following [this guide](https://learn.microsoft.com/en-us/windows/wsl/install).

- Install [Rancher Desktop](https://rancherdesktop.io/)

  - Choose `dockerd (moby)` as the Container Engine
  - Disable Kubernetes

- Reboot your computer

- Run the following commands one by one in PowerShell,

  ```sh
  cp .env.example .env
  docker compose create
  docker compose run node npm ci
  docker compose up --detach --wait postgres
  docker compose run node npm run build
  docker compose run node npm run seed-db
  ```

## Develop the app

In PowerShell,

```ps
$Env:NODE_ENV="development"; docker compose up
```

## Run the app

- Edit the `POSTGRES_PASSWORD`, `IRON_SESSION_PASSWORD` and `PGADMIN_DEFAULT_PASSWORD` in the `.env` file with your own credentials

- In PowerShell,

  ```sh
  docker compose up
  ```
