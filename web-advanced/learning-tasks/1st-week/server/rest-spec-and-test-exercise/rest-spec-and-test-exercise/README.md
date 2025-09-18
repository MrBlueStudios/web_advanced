# Exercise
Richard (the course responsible teacher) is running his own gym, to keep the IT students and teacher in good shape. He wants to create a REST API with workout routines. 

The routines are described with the following structure. All routines are stored in-memory, in an object (see `routes/workout.js`).
```js
{
  "id": 1,
  "name": "Full Body Blast",
  "exercises": [
    { "name": "Push-ups", "reps": 20 },
    { "name": "Squats", "reps": 30 }
  ]
}
```

The REST API should have the following endpoints:

| Method | Endpoint         | Description                  |
|--------|------------------|------------------------------|
| GET    | `/routines`      | Get all workout routines      |
| GET    | `/routines/:id`  | Get a specific routine by ID  |
| POST   | `/routines`      | Create a new workout routine  |
| PUT    | `/routines/:id`  | Update a workout routine      |
| DELETE | `/routines/:id`  | Delete a workout routine      |

We want to make sure that there is proper error handling, with proper status codes. Things that should be checked are:
- The id exists (when using /:id options).
- The name of the workout is unique.
- Each workout has at least 1 exercise.
- Getting all routines returns an array
- Creating a routine returns 201 + new routine
- Updating a routine works correctly
- Deleting a routine removes it from memory
- Invalid inputs return 400

First write the API specification in `routes/workout.js`. The stubs are already present.

Secondly write the tests for the API specification in `tests/workout.test.js`