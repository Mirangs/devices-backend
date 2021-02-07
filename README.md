# Devices Backend

This project uses to serve data to [Devices Frontend](https://github.com/Mirangs/devices-frontend)

## Prequisites

- Installed **NodeJS 14.15.4**
- Installed **Docker**

It is recommended to run service in Docker container

`docker-compose up`

## Env file

Project has `.env` file which contains port for serving application

## Scripts

While first run you need to initialize database with initial data

`yarn run init`

or

`npm run init`

To start project, run

`yarn dev`

or

`npm run dev`
