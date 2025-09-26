# Week 1 Server Task Guide

## Goal
Implement and document the workout routines REST API using the in-memory store provided in the starter so that it matches the specification from the REST exercise and is fully covered by automated tests.

## 1. Project Setup and Context
1. Open `learning-tasks/1st-week/server/rest-spec-and-test-exercise/rest-spec-and-test-exercise` in your editor.
2. Run `npm install` to pull in Express, Swagger, Vitest, and Supertest dependencies before editing files.
3. Ensure `src/index.js` mounts the router at `/routines` (`app.use('/routines', workoutRouter);`) so the implementation follows the documented endpoints.

## 2. Describe the Routine Schema for Swagger
1. In `src/routes/workout.js`, add a JSDoc `@swagger` block that defines a `Routine` schema with the fields shown in the README (`id`, `name`, and an `exercises` array of `{ name, reps }`).
2. Include example values from the README so the generated docs at `/api-docs` clearly communicate the payload format.

## 3. Implement CRUD Endpoints
Work inside `src/routes/workout.js`, using the existing `routines` array and `nextId` counter.

### GET `/routines`
* Return `res.status(200).json(routines);` so consumers always receive an array.

### GET `/routines/:id`
* Convert the route parameter to a number, locate the routine, and return `404` with a JSON error when it is missing.
* Respond with the routine JSON when found.

### POST `/routines`
* Read `name` and `exercises` from the body.
* Reject duplicate names (case insensitive to be safe) with a `400` error.
* Enforce that `exercises` is an array with at least one item and that each exercise has a `name` and numeric `reps`.
* Assign `id = nextId++`, push the routine into `routines`, and return `status(201)` with the created routine.

### PUT `/routines/:id`
* Validate the id exists or return `404`.
* Re-run the same body checks used for POST, allowing the current routine to keep its name without tripping the duplicate-name rule.
* Replace the stored routine contents (name and exercises) and return the updated routine in the response.

### DELETE `/routines/:id`
* Validate the id exists; respond with `404` if it does not.
* Remove the routine from the array (e.g., `splice`) and respond with `status(204).end()`.

## 4. Centralize Validation Helpers (Optional but Recommended)
Create small helper functions inside `workout.js` for locating routines, checking for duplicate names, and validating exercise payloads so POST and PUT can reuse the same logic.

## 5. Testing Expectations
1. Open `src/tests/workout.test.js` and replace the TODO blocks with Vitest cases that cover:
   * Each successful CRUD operation (`GET /routines`, `GET /routines/:id`, `POST`, `PUT`, `DELETE`).
   * Failure cases: missing ids (expect `404`), duplicate names, empty exercise arrays, and malformed payloads (`400`).
   * Verifying POST returns `201` and echoes the created routine; DELETE removes the routine (e.g., a follow-up GET array length check); PUT persists updates for subsequent GETs.
2. Use Supertest to issue requests against `/routines` and seed data within the tests as needed.
3. Run `npm test` to ensure the suite passes.

## 6. Final Review
* Re-open the Swagger UI at `/api-docs` to confirm the documented endpoints and schema reflect the implementation.
* Confirm each checklist item in `tasks/week1-server.md` now aligns with the README requirements.

## Sources
- `learning-tasks/1st-week/server/rest-spec-and-test-exercise/rest-spec-and-test-exercise/README.md`
