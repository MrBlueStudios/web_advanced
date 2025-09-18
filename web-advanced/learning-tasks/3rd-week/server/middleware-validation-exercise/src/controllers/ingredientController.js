import {Ingredient} from "../db/database-helper.js";

export const getAllIngredients = async (req, res) => {
    const ingredients = await Ingredient.findAll();
    res.status(200).json(ingredients);
}

export const getIngredientById = async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ "error": "Invalid id" });
    }

    const ingredient = await Ingredient.findByPk(id);
    if (!ingredient) {
        return res.status(404).json({ "error": `Ingredient not found with id: ${id}`});
    }
    res.status(200).json(ingredient);
}

export const addIngredient = async (req, res) => {
    const { name, quantity } = req.body;

    // Validate the input
    if (!name || typeof name !== "string") {
        return res.status(400).json({ "error": "Name is missing or of invalid type."});
    }
    if (!quantity || typeof quantity !== "number" || !Number.isInteger(quantity) || quantity <= 0) {
        return res.status(400).json({ "error": "Quantity is missing, of invalid type not a positive number"});
    }

    const newIngredient = await Ingredient.create({ name, quantity });
    res.status(201).json(newIngredient);
}

export const updateIngredient = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, quantity } = req.body;

    // Validate input
    if (isNaN(id)) {
        return res.status(400).json({ "error": "Invalid id" });
    }
    if (!name || typeof name !== "string") {
        return res.status(400).json({ "error": "Name is missing or of invalid type."});
    }
    if (!quantity || typeof quantity !== "number" || !Number.isInteger(quantity) || quantity <= 0) {
        return res.status(400).json({ "error": "Quantity is missing, of invalid type not a positive number"});
    }

    const ingredient = await Ingredient.findByPk(id);
    if (!ingredient) {
        return res.status(404).json({ "error": `Ingredient not found with id: ${id}`});
    }
    ingredient.name = name;
    ingredient.quantity = quantity;
    await ingredient.save();

    res.status(200).json(ingredient);
};

export const deleteIngredientById = async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ "error": "Invalid id" });
    }

    const numRowsDeleted = await Ingredient.destroy({
        where: { id }
    });
    if (numRowsDeleted === 0) {
        return res.status(404).json({ "error": `Ingredient not found with id: ${id}`});
    }

    res.status(204).end();
}
