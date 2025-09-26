# Week 1 Server Checklist

## API Specification
- [ ] Define the workout routine schema in `routes/workout.js` using the provided in-memory structure.
- [ ] Document GET `/routines` to return all workout routines.
- [ ] Document GET `/routines/:id` to retrieve a routine by id and handle missing ids.
- [ ] Document POST `/routines` to create a new routine and respond with `201` plus the created routine.
- [ ] Document PUT `/routines/:id` to update an existing routine.
- [ ] Document DELETE `/routines/:id` to remove a routine from the in-memory store.

## Validation & Error Handling
- [ ] Validate that ids exist before processing `/:id` requests.
- [ ] Reject duplicate routine names.
- [ ] Require each routine to contain at least one exercise.
- [ ] Return `400` for invalid payloads.

## Testing
- [ ] Implement the REST tests in `tests/workout.test.js` to cover success paths for each CRUD endpoint.
- [ ] Add tests for validation failures such as missing ids, duplicate names, empty exercise lists, and malformed payloads.
- [ ] Verify through tests that creating a routine returns `201` with the new routine.
- [ ] Verify through tests that deleting a routine removes it from the store.
- [ ] Verify through tests that fetching all routines returns an array and that updates persist after `PUT`.

## Sources
- `learning-tasks/1st-week/server/rest-spec-and-test-exercise/rest-spec-and-test-exercise/README.md`
