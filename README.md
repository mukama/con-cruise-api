# Con Cruise API

## Description

Con Cruise API solves an optimization problem in demand fulfillment between customers and the cruisers. This implementaion uses the hungarian algorithm, a combinatorial optimization algorithm that solves this specific assignment problem.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Adding a new customer

```
curl -d '{"name": "Caesar Mukama", "latitude": 8.0093062, "longitude": -62.4015536, "rides": 49, "rating": 4}' -H "Content-Type: application/json" -X POST http://localhost:3000/customer
```

## CLI

https://github.com/mukama/con-cruise-cli
