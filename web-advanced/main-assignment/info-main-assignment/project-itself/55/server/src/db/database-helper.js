import {Sequelize} from "sequelize";

// Check https://sequelize.org/ for the Getting Started
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: `db/database.${process.env.NODE_ENV}.sqlite`
});

// TODO create your tables here, see https://sequelize.org/docs/v6/core-concepts/model-basics/#model-definition

// TODO export your own functions here, which you can use in your controllers