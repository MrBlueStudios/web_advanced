# Shopping list (exercise with middleware and validation)

This project contains a backend for a simple shopping list application.
The following endpoints are available to you:

| Method | Endpoint           | Description                     |
|--------|--------------------|---------------------------------|
| GET    | `/ingredients`     | Get all ingredients             |
| GET    | `/ingredients/:id` | Get a specific ingredient by ID |
| POST   | `/ingredients`     | Create a new ingredient record  |
| PUT    | `/ingredients/:id` | Update an ingredient            |
| DELETE | `/ingredients/:id` | Delete an ingredient    |

Example output of calling `/ingredients`:
```json
{
  "id": 1,
  "name": "Apple",
  "quantity": 2
}
```

## Installation
Install the dependencies by running `npm run i`.

## Exercise
You are going to implement various middleware functions. The `middleware` folder already contains the files.

### Part 1: Router middleware

#### 1. Validation
We want to validate the user input for our REST-API using middleware. You will need to write the following middleware functions:
- `validateIngredientId`: check if the provided value is a correct integer. In addition: check if the id exists in the database.
- `validateIngredientBody`: validate the body of the request. The name should be at least 2 characters (and no trailing spaces) and the quantity should have a minimum of 1.

Open the `ingredientRouter.js` and attach the middleware to the routes, where needed.

### Part 2: Global middleware

#### 1. Implementing a logger
We would like to keep track of all the requests that are made to the server. Therefore we are going to create a `server.log` file, containing all incoming requests.

For each request we would like to store:
- Date/time of the request
- The IP-address of the request
- To which endpoint the request was made (including query parameters, but excluding body, because we don't want to log plain text passwords!).
- User agent and operating system (you are allowed to use the `ua-parser-js` library for this).

#### (extra) 2. Implementing a rate limiter
A rate limiter is a component that keeps track of the number of incoming requests and limits access to the API after a certain amount of calls from an IP-address. In this exercise you will limit each IP-address to 10 calls per day.

The middleware should keep track of a counter for each IP-address. Everytime a new request comes in from the same IP-address, the counter is increased. When the counter exceeds the limit (10 visits per IP per day), the API will return a 429 status code: Too Many Requests (preferably with a proper JSON body as well).

It suffices to schedule a daily job that clears the whole IP-address/counter list in the application.