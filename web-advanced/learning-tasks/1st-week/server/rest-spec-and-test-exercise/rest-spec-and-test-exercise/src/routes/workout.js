import express from 'express';

const router = express.Router();

// In-memory storage
const routines = [];
let nextId = 1;

router.get('/', (req, res) => {
  // TODO: Implement this method
  res.status(200).json([]);
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  // TODO: Implement this method
  res.json({});
});

// POST /routines - Create a new routine
router.post('/', (req, res) => {
  // TODO: Implement this method
  res.json({});
});

// PUT /routines/:id - Update a routine
router.put('/:id', (req, res) => {
  // TODO: Implement this method
  res.json({});
});

// DELETE /routines/:id - Delete a routine
router.delete('/:id', (req, res) => {
  // TODO: Implement this method
  res.json({});
});

export default router;