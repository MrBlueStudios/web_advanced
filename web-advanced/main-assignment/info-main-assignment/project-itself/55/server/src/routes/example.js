/**
 * This is an example route file demonstrating OpenAPI documentation.
 * PLEASE REMOVE THIS FILE ONCE YOU HAVE YOUR OWN ROUTES!!!
 */
import express from 'express';
const router = express.Router();

/**
 * @openapi
 * /example/{id}:
 *   get:
 *     summary: Get an example object by ID
 *     description: Returns an example object if the ID is `1`, otherwise returns an error.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the example object
 *     responses:
 *       200:
 *         description: Example object returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 value:
 *                   type: string
 *                   example: "Hello World"
 *       404:
 *         description: Example object not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Example not found"
 */
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (id === 1) {
    return res.json({ id: 1, value: 'Hello World' });
  } else {
    return res.status(404).json({ error: 'Example not found' });
  }
});

export default router;