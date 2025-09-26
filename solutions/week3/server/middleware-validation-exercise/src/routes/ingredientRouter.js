import express from 'express';
import {
  getAllIngredients,
  getIngredientById,
  addIngredient,
  updateIngredient,
  deleteIngredientById,
} from '../controllers/ingredientController.js';
import {
  validateIngredientBody,
  validateIngredientId,
} from '../middleware/ingredientValidation.js';

const router = express.Router();

router.get('/', getAllIngredients);
router.get('/:id', validateIngredientId, getIngredientById);
router.post('/', validateIngredientBody, addIngredient);
router.put('/:id', validateIngredientId, validateIngredientBody, updateIngredient);
router.delete('/:id', validateIngredientId, deleteIngredientById);

export default router;
