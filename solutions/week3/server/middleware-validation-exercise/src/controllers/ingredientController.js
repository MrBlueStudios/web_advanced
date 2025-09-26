import { Ingredient } from '../db/database-helper.js';

export const getAllIngredients = async (req, res) => {
  const ingredients = await Ingredient.findAll({ order: [['id', 'ASC']] });
  res.status(200).json(ingredients);
};

export const getIngredientById = async (req, res) => {
  const ingredient = req.ingredient
    || (await Ingredient.findByPk(Number.parseInt(req.params.id, 10)));

  if (!ingredient) {
    return res.status(404).json({ error: `Ingredient not found with id: ${req.params.id}` });
  }

  return res.status(200).json(ingredient);
};

export const addIngredient = async (req, res) => {
  const { name, quantity } = req.body;
  const created = await Ingredient.create({ name, quantity });
  return res.status(201).json(created);
};

export const updateIngredient = async (req, res) => {
  const ingredient = req.ingredient
    || (await Ingredient.findByPk(Number.parseInt(req.params.id, 10)));

  if (!ingredient) {
    return res.status(404).json({ error: `Ingredient not found with id: ${req.params.id}` });
  }

  ingredient.name = req.body.name;
  ingredient.quantity = req.body.quantity;
  await ingredient.save();

  return res.status(200).json(ingredient);
};

export const deleteIngredientById = async (req, res) => {
  const ingredient = req.ingredient
    || (await Ingredient.findByPk(Number.parseInt(req.params.id, 10)));

  if (!ingredient) {
    return res.status(404).json({ error: `Ingredient not found with id: ${req.params.id}` });
  }

  await ingredient.destroy();
  return res.status(204).end();
};
