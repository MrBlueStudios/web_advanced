import { Ingredient } from '../db/database-helper.js';

export const validateIngredientId = async (req, res, next) => {
  const id = Number.parseInt(req.params.id, 10);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid id' });
  }

  const ingredient = await Ingredient.findByPk(id);
  if (!ingredient) {
    return res.status(404).json({ error: `Ingredient not found with id: ${id}` });
  }

  req.ingredient = ingredient;
  return next();
};

export const validateIngredientBody = (req, res, next) => {
  const { name, quantity } = req.body ?? {};
  const errors = [];

  if (typeof name !== 'string' || name.trim().length < 2) {
    errors.push('Name must contain at least 2 characters.');
  }

  if (!Number.isInteger(quantity) || quantity < 1) {
    errors.push('Quantity must be a positive integer.');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  req.body.name = name.trim();
  req.body.quantity = quantity;

  return next();
};
