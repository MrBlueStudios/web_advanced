import { Ingredient } from '../db/database-helper.js';

const validateIngredientBody = ({ name, quantity }) => {
  const errors = [];

  if (typeof name !== 'string' || name.trim().length === 0) {
    errors.push('Name is missing or of invalid type.');
  }
  if (!Number.isInteger(quantity) || quantity <= 0) {
    errors.push('Quantity is missing, of invalid type not a positive number');
  }

  return { errors, name: typeof name === 'string' ? name.trim() : name, quantity };
};

export const getAllIngredients = async (req, res) => {
  const ingredients = await Ingredient.findAll({ order: [['id', 'ASC']] });
  res.status(200).json(ingredients);
};

export const getIngredientById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid id' });
  }

  const ingredient = await Ingredient.findByPk(id);
  if (!ingredient) {
    return res.status(404).json({ error: `Ingredient not found with id: ${id}` });
  }

  return res.status(200).json(ingredient);
};

export const addIngredient = async (req, res) => {
  const { errors, name, quantity } = validateIngredientBody(req.body ?? {});
  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(' ') });
  }

  const newIngredient = await Ingredient.create({ name, quantity });
  return res.status(201).json(newIngredient);
};

export const updateIngredient = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid id' });
  }

  const { errors, name, quantity } = validateIngredientBody(req.body ?? {});
  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(' ') });
  }

  const ingredient = await Ingredient.findByPk(id);
  if (!ingredient) {
    return res.status(404).json({ error: `Ingredient not found with id: ${id}` });
  }

  ingredient.name = name;
  ingredient.quantity = quantity;
  await ingredient.save();

  return res.status(200).json(ingredient);
};

export const deleteIngredientById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid id' });
  }

  const deletedCount = await Ingredient.destroy({ where: { id } });
  if (deletedCount === 0) {
    return res.status(404).json({ error: `Ingredient not found with id: ${id}` });
  }

  return res.status(204).end();
};
