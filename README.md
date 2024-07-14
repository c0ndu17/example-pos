# [Example: Point of Sale](https://github.com/c0ndu17/crypto-pos)

Covid, Euros, and trying out WeWork for the first time, made for an interesting tech test.

## Table of Contents
- [Punchline](#punchline)
- [Overview](#overview)
- [Installation](#installation)
  - [The Block](#the-block)
- [Usage](#usage)

## Punchline
```bash
docker compose up 
```

## Overview

A Restaurant Point of Sale, implemented using a Backend for Frontend pattern.

Services
- `packages/backend` -  Prisma/Pothos/Apollo Server
- `packages/frontend` - Remix/TanstackQuery/GraphQLCodegen

Models:
- RestaurantTable
- Bill
- MenuItem
- BillMenuItem | Join Table


You should be able to run the project with `docker compose up` and then navigate to the host and port output by the frontend pos, i.e. `http://172.23.0.3:5173/` to see the frontend.

The main callout, I regret this design for a tech test. I chose it - mostly talking about, the Compose, BFF, and previously unknown Pothos - because I wanted to at least learn something. Fun times.

I'm used to using nexus (js) - by Prisma.io - for stuff like this, but it's no longer maintained /cry. Ended up Pothos a go. It's very similiar to nexus, and somewhat recommended by Prisma, but it doesn't look super supported.

Anywho, I'd say probably stay clear, but it's good. I'd have tried trpc, but it didn't fit in the requirements. ;(

@0no-co/graphqlsp :thumbsup:

## Installation

### The Block

Requirements:
- Node.js
- npm
- Docker
- Free Ports: 
    - 3000 | FE start
    - 4000 | BE start
    - 5173 | FE Dev

```bash
git clone https://github.com/c0ndu17/crypto-pos.git
cd crypto-pos
npm install
cp ./packages/backend/.env.template ./packages/backend/.env 
cp ./packages/frontend/.env.template ./packages/backend/.env
npm run dev # Hold your breath.
```

1. Clone the repository
```bash
git clone https://github.com/c0ndu17/crypto-pos.git
```

2. Run the following command to install the dependencies
```bash
npm install
cp ./packages/backend/.env.template ./packages/backend/.env 
cp ./packages/frontend/.env.template ./packages/backend/.env
```

```bash
npm run dev
```


## Usage
1. Run the following command to start the server
```bash
npm start
```

### Backend
3. Change directory to the backend
```bash
cd packages/backend
npm run generate:prisma # You shouldn't need to do this
```

### Frontend
3. Change directory to the frontend
```bash
cd packages/frontend
npm run generate:graphql # The backend must be running
```
2. Open your browser and go to `http://localhost:3000/`

3. You can now start using the system

### Seed
To seed the database with some data, run the following command. 

This shouldn't be required to start, this project is using SQLite.
```bash
npm run db:seed
```

### Probably All Ready Out of Date Script Reference
```
Lifecycle scripts included in @crypto-pos/mono@1.0.0:
  start
    npm start --workspaces --parallel
  test
    echo "Error: no test specified" && exit 1
  postinstall
    ./scripts/post-install

available via `npm run-script`:
  build:frontend
    npm run -w @crypto-pos/frontend build
  build:backend
    npm run -w @crypto-pos/backend build
  build
    npm run build --workspaces --parallel
  dev:frontend
    npm run -w @crypto-pos/frontend dev
  dev:backend
    npm run -w @crypto-pos/backend dev
  dev
    concurrently "npm run dev:frontend" "npm run dev:backend" --kill-others --success first
  start:frontend
    npm run -w @crypto-pos/frontend start
  start:backend
    npm run -w @crypto-pos/backend start
```

## Author
[George Phillips](georgephillips22@gmail.com)
