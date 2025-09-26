# Week 3 Server Checklist

## Setup
- [ ] Install project dependencies with `npm run i`.

## Router Middleware
- [ ] Implement `validateIngredientId` to ensure ids are integers and exist in the database.
- [ ] Implement `validateIngredientBody` to enforce trimmed names with at least two characters and quantities of at least 1.
- [ ] Attach the validation middleware to the appropriate routes in `ingredientRouter.js`.

## Global Middleware
- [ ] Implement a logger that writes `server.log` entries containing the timestamp, IP address, requested endpoint (with query parameters), and user agent/operating system.

## Extras (Optional)
- [ ] Add a rate limiter that caps each IP address at 10 requests per day and returns `429 Too Many Requests` when exceeded.
- [ ] Schedule a daily job to reset the rate-limiter counters.

## Sources
- `learning-tasks/3rd-week/server/middleware-validation-exercise/README.md`
