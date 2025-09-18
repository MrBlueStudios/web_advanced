import express from 'express';
import {
  getAllIngredients, getIngredientById, addIngredient, updateIngredient, deleteIngredientById
} from '../controllers/ingredientController.js'
const router = express.Router();

router.get("/", getAllIngredients);
router.get("/:id", getIngredientById);
router.post("/", addIngredient);
router.put("/:id", updateIngredient);
router.delete("/:id", deleteIngredientById);

export default router;