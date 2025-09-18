import { Sequelize } from "sequelize";

// Check https://sequelize.org/ for the Getting Started
export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: `db/database.${process.env.NODE_ENV}.sqlite`,
    logging: console.log // DEBUG MODE
});

/**
 * This method should be called in the index.js to initialize the database
 * @returns {Promise<void>} Fulfilled when the database is setup.
 */
export async function initDatabase() {
    await sequelize.sync({ alter: true });
    console.log("Database ready for use.");
}
