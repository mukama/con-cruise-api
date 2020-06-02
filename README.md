# Con Cruise API

## Description

This implementaion uses the [hungarian algorithm](https://en.wikipedia.org/wiki/Hungarian_algorithm) to solve an optimization problem in demand fulfillment between customers and the cruisers.

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