# Shoppinglist (exercise with Sequelize and .env files)

This project contains a backend for a simple shoppinglist application.
The following endpoints are available to you:

| Method | Endpoint           | Description                     |
|--------|--------------------|---------------------------------|
| GET    | `/ingredients`     | Get all ingredients             |
| GET    | `/ingredients/:id` | Get a specific ingredient by ID |
| POST   | `/ingredients`     | Create a new ingredient record  |
| PUT    | `/ingredients/:id` | Update an ingredient            |
| DELETE | `/ingredients/:id` | Delete an ingredient    |

Example output of calling `/ingredients`:
```json
{
  "id": 1,
  "name": "Apple",
  "quantity": 2
}
```

## Exercise
1. Install the dependencies and create the `.env.dev` file by copying the `.env.example` file. Adjust the settings.
2. Study the project structure and see if you understand the link between routes, controllers and db.
3. Implement the Sequelize data model for ingredients in the `database-helper.js` file.
4. Implement the logic in the controllers.
5. Create a second environment for testing. Make sure the database uses the `in-memory` database of sqlite.
6. Create a method that seeds data into the database, when we are in test mode.