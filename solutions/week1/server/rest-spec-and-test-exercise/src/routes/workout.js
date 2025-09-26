import express from 'express';

const router = express.Router();

const routines = [];
let nextId = 1;

const findRoutineIndexById = (id) => routines.findIndex((routine) => routine.id === id);

const normalizeExercise = (exercise) => ({
  name: exercise.name.trim(),
  reps: exercise.reps,
});

const validateRoutinePayload = (payload, { allowExistingId = null } = {}) => {
  const errors = [];

  if (!payload || typeof payload !== 'object') {
    errors.push('Request body must be an object.');
    return { errors };
  }

  const name = typeof payload.name === 'string' ? payload.name.trim() : '';
  if (!name) {
    errors.push('Routine name is required.');
  } else {
    const duplicate = routines.find(
      (routine) => routine.name.toLowerCase() === name.toLowerCase() && routine.id !== allowExistingId,
    );
    if (duplicate) {
      errors.push('Routine name must be unique.');
    }
  }

  if (!Array.isArray(payload.exercises)) {
    errors.push('Exercises must be provided as an array.');
  } else if (payload.exercises.length === 0) {
    errors.push('Routine must contain at least one exercise.');
  }

  const exercises = Array.isArray(payload.exercises)
    ? payload.exercises.map((exercise, index) => {
        if (!exercise || typeof exercise !== 'object') {
          errors.push(`Exercise at index ${index} must be an object.`);
          return null;
        }

        const exerciseName = typeof exercise.name === 'string' ? exercise.name.trim() : '';
        if (!exerciseName) {
          errors.push(`Exercise at index ${index} must include a name.`);
        }

        if (!Number.isInteger(exercise.reps) || exercise.reps <= 0) {
          errors.push(`Exercise at index ${index} must include a positive integer for reps.`);
        }

        return exerciseName ? normalizeExercise({ name: exerciseName, reps: exercise.reps }) : null;
      })
    : [];

  return {
    errors,
    data: errors.length === 0 ? { name, exercises } : null,
  };
};

router.get('/', (req, res) => {
  res.status(200).json(routines);
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Routine id must be an integer.' });
  }

  const routine = routines.find((item) => item.id === id);
  if (!routine) {
    return res.status(404).json({ error: `Routine with id ${id} was not found.` });
  }

  return res.status(200).json(routine);
});

router.post('/', (req, res) => {
  const { errors, data } = validateRoutinePayload(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const routine = { id: nextId++, ...data };
  routines.push(routine);

  return res.status(201).json(routine);
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Routine id must be an integer.' });
  }

  const index = findRoutineIndexById(id);
  if (index === -1) {
    return res.status(404).json({ error: `Routine with id ${id} was not found.` });
  }

  const { errors, data } = validateRoutinePayload(req.body, { allowExistingId: id });
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const updatedRoutine = { id, ...data };
  routines[index] = updatedRoutine;

  return res.status(200).json(updatedRoutine);
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Routine id must be an integer.' });
  }

  const index = findRoutineIndexById(id);
  if (index === -1) {
    return res.status(404).json({ error: `Routine with id ${id} was not found.` });
  }

  routines.splice(index, 1);
  return res.status(204).end();
});

export const resetRoutines = () => {
  routines.length = 0;
  nextId = 1;
};

export default router;
