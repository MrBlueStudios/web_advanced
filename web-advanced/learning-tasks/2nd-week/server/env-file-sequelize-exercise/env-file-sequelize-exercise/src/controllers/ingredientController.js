export const getAllIngredients = (req, res) => {
    // TODO: implement

    res.status(200).json({});
}

export const getIngredientById = (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ "error": "Invalid id" });
    }

    // TODO: implement

    res.status(200).json({});
}

export const addIngredient = (req, res) => {
    const { name, quantity } = req.body;

    // Validate the input
    if (!name || typeof name !== "string") {
        return res.status(400).json({ "error": "Name is missing or of invalid type."});
    }
    if (!quantity || typeof quantity !== "number" || !Number.isInteger(quantity) || quantity <= 0) {
        return res.status(400).json({ "error": "Quantity is missing, of invalid type not a positive number"});
    }

    // TODO: implement

    res.status(201).json({});
}

export const updateIngredient = (req, res) => {
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

    // TODO: implement

    res.status(200).json({});
};

export const deleteIngredientById = (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ "error": "Invalid id" });
    }

    // TODO: implement

    res.status(204).end();
}
