# Week 1 Server Checklist

## API Endpoints
- [ ] GET `/routines` returns an array of routines.
- [ ] GET `/routines/:id` retrieves an existing routine by id and handles missing ids.
- [ ] POST `/routines` creates a new routine and responds with `201` plus the created routine.
- [ ] PUT `/routines/:id` updates an existing routine.
- [ ] DELETE `/routines/:id` removes the routine from memory.

## Validation Rules
- [ ] Reject duplicate routine names.
- [ ] Require at least one exercise per routine.
- [ ] Validate that targeted ids exist before updating or deleting.
- [ ] Return `400` for invalid inputs.

## Testing
- [ ] Add tests that cover the success path for each CRUD endpoint.
- [ ] Add tests that cover validation failures (missing id, duplicate name, empty exercises, invalid payloads).
- [ ] Verify through tests that creating returns `201` with the new routine and that deleting removes it from the store.
- [ ] Verify through tests that fetching all routines returns an array and that updates persist.
