import { Sequelize, DataTypes } from "sequelize";

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: `db/database.${process.env.NODE_ENV}.sqlite`,
    logging: console.log // DEBUG MODE
});

export const Ingredient = sequelize.define('Ingredient', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    }
}, {
    timestamps: false // This makes sure that there are no createdAt and updatedAt fields.
});

/**
 * This method should be called in the index.js to initialize the database
 * @returns {Promise<void>} Fulfilled when the database is setup.
 */
export async function initDatabase() {
    await sequelize.sync({ force: true }); // PLEASE NOTE: THIS WILL RESET THE DATABASE AT THE START OF THE PROGRAM!!!
    await seedDummyData();
    console.log("Database ready for use.");
}

const seedDummyData = async () => {
    await Ingredient.bulkCreate([
        { name: "Onions", quantity: 3 },
        { name: "Garlic", quantity: 2 },
        { name: "Tomatoes", quantity: 6 },
        { name: "Mozzarella", quantity: 1 }
    ]);
};