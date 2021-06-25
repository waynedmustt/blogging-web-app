# Description

Blogging web app built in React.js for front-end and NestJS for back-end.
The documentation about this website including screenshots and DB content can be found in `document` folder. 

# Running the React.js (Client) App

## Installation

```bash
# go to client folder
$ cd client

# install dependency
$ yarn install

# env
$ cp src/config.json.example src/config.json
```

## Running App
```bash
# run dev command
$ yarn run start
```

# Running the NestJS (Server) App

## Installation

```bash
# go to server folder
$ cd server

# install dependency
$ yarn install
```

## Database

### Setup

Please `take note` you need to install PostgreSQL first to run the server or can use docker compose following below:

```bash
# go to docker dev folder
$ cd docker/server-dev

# build & run postgres image
$ docker-compose up -d
```

### Migration

```bash
# env
$ cp .env.example .env

# build
$ yarn run build

# migration
$ yarn run typeorm migration:run
```

## Running App
```bash
# run dev command
$ yarn run start:dev
```

## Test

```bash
# unit tests
$ yarn test

# prettier code
$ yarn format
```
