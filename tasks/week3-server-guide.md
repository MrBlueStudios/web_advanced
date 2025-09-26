# Week 3 Server Task Guide

## Goal
Implement validation and logging middleware for the shopping list backend and optionally extend it with rate limiting as described in the middleware exercise.

## 1. Prepare the Project
1. Navigate to `learning-tasks/3rd-week/server/middleware-validation-exercise`.
2. Install dependencies (`npm install`). The logger instructions allow you to add `ua-parser-js` if you prefer using it for user-agent parsing.

## 2. Build Router-Level Validation
Work in `src/middleware/ingredientValidation.js` and `src/routes/ingredientRouter.js`.

### `validateIngredientId`
1. Parse `req.params.id` and ensure it is a valid integer.
2. Use your data layer (e.g., the Sequelize model) to check if the ingredient exists; send a `404` when it does not.
3. Store the loaded record on `req.ingredient` so downstream handlers can reuse it, then call `next()`.

### `validateIngredientBody`
1. Trim the incoming `name` and check it is at least two characters long.
2. Ensure `quantity` is a number greater than or equal to 1.
3. Return `400` with a helpful JSON error message when validation fails; otherwise call `next()`.

### Attach Middleware
1. Import the validation functions into `src/routes/ingredientRouter.js`.
2. Apply `validateIngredientId` to the routes that operate on `/:id`.
3. Apply `validateIngredientBody` to POST and PUT routes (after the ID validator on PUT).

## 3. Implement Global Logger Middleware
1. In `src/middleware/logger.js`, create a middleware that captures the timestamp, `req.ip`, `req.originalUrl` (which includes query parameters), and the user agent string.
2. Optionally parse the user agent with `ua-parser-js` to extract the browser and OS.
3. Append each log line to `server.log` (e.g., via `fs.appendFile`) and call `next()` once the write completes.
4. Register the middleware near the top of `src/index.js` so every request passes through it.

## 4. Optional Rate Limiter
1. Implement the counter logic in `src/middleware/limiter.js` to track requests per IP per day and reject the 11th request with `429`.
2. Use `setInterval` or a similar scheduler in `index.js` to reset the counter every 24 hours if you choose to complete the bonus requirement.

## 5. Verification
1. Start the server and hit each route to observe validation errors and success responses.
2. Confirm `server.log` receives one line per request containing the required metadata.
3. If the rate limiter is implemented, exercise it with repeated requests to verify the `429` response.
4. Check off tasks in `tasks/week3-server.md` when all required middleware is in place.

## Sources
- `learning-tasks/3rd-week/server/middleware-validation-exercise/README.md`
