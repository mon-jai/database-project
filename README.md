# E Shop

## Setup

On a Windows machine,

1. Install Windows Subsystem for Linux following [this guide](https://learn.microsoft.com/en-us/windows/wsl/install).

2. Install [Rancher Desktop](https://rancherdesktop.io/)

   - Choose `dockerd (moby)` as the Container Engine
   - Disable Kubernetes

3. Reboot your computer

4. Run the following commands one by one in PowerShell,

   ```ps
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

### Some pre-configured accounts

- Administrator account\
  username: admin\
  password: admin

- User account with demo data\
  username: mon.jai.tw\
  password: testpass

## Run the app in production

1. Replace `POSTGRES_PASSWORD`, `IRON_SESSION_PASSWORD` and `PGADMIN_DEFAULT_PASSWORD` with your own credentials in the `.env` file

2. In PowerShell,

   ```ps
   docker compose up
   ```
