# Description

Blogging web app built in React.js for front-end and NestJS for back-end.

# Running the React.js (Client) App

## Installation

```bash
$ cd client

$ yarn install

$ cp src/config.json.example src/config.json
```

## Running App
```bash
$ yarn run start
```

# Running the NestJS (Server) App

## Installation

```bash
$ cd server

$ yarn install
```

## Database

### Setup

Please `take note` you need to install PostgreSQL first to run the server or can use docker compose following below:

```bash
# env
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
$ yarn run start:dev
```

## Test

```bash
# unit tests
$ yarn test

# prettier code
$ yarn format
```
