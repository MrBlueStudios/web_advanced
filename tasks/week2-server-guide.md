# Week 2 Server Task Guide

## Goal
Configure environment-specific settings for the Sequelize-powered shopping list API, finish the data model and controllers, and provide seed data for automated tests.

## 1. Environment Preparation
1. Open `learning-tasks/2nd-week/server/env-file-sequelize-exercise/env-file-sequelize-exercise`.
2. Install dependencies with `npm install` so Sequelize and sqlite3 bindings are available.
3. Create `.env.dev` by copying `.env.example` and fill in values such as `PORT`, `NODE_ENV=dev`, and any database logging flags used by the starter.
4. Update your launch configuration or npm scripts so `NODE_ENV=dev` is set when running locally (e.g., `cross-env NODE_ENV=dev` in package scripts if needed).

## 2. Understand the Project Layout
* `src/db/database-helper.js` is responsible for initializing Sequelize.
* `src/controllers/ingredientController.js` contains placeholders for CRUD logic.
* `src/routes/ingredientRouter.js` already wires controller functions to `/ingredients` endpoints.

## 3. Implement the Sequelize Model
1. In `src/db/database-helper.js`, define an `Ingredient` model (e.g., `export const Ingredient = sequelize.define('Ingredient', { ... })`) with `name` (string) and `quantity` (integer) attributes to match the README example.
2. Ensure the model is synced in `initDatabase()` so tables are created when the app boots.
3. Export the model so controllers can import it.

## 4. Complete Controller Logic
Work through `src/controllers/ingredientController.js`:
1. `getAllIngredients`: query `Ingredient.findAll()` and return the array.
2. `getIngredientById`: fetch by primary key, return `404` when absent.
3. `addIngredient`: create a record with the validated body and respond with `201`.
4. `updateIngredient`: locate the record, return `404` if missing, update `name`/`quantity`, and respond with the saved instance.
5. `deleteIngredientById`: destroy the record when found, returning `204` on success and `404` when nothing is deleted.
Make sure each branch returns JSON bodies consistent with the validation errors that are already present.

## 5. Configure Test Environment and Seeding
1. Adjust the Sequelize initialization so when `process.env.NODE_ENV === 'test'` the storage uses `':memory:'` instead of the on-disk file. You can branch the options before instantiating `Sequelize`.
2. Create a `seedTestData()` helper inside `database-helper.js` that bulk creates sample ingredients. Call it from `initDatabase()` when `NODE_ENV === 'test'` so automated tests have predictable data.
3. Export `seedTestData` if you prefer invoking it from a separate test setup script.

## 6. Verification Steps
1. Run the API in dev mode (`npm run dev` or `node src/index.js`) and exercise each `/ingredients` endpoint with a REST client or curl to confirm CRUD functionality.
2. Switch to the test environment (set `NODE_ENV=test`) and start the server; confirm it uses the in-memory database and seeds data without touching the on-disk file.
3. Mark off checklist items in `tasks/week2-server.md` once each behavior matches the README expectations.

## Sources
- `learning-tasks/2nd-week/server/env-file-sequelize-exercise/env-file-sequelize-exercise/README.md`
