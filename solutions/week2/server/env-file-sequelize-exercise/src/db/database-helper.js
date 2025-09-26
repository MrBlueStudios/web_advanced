import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Sequelize, DataTypes } from 'sequelize';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..', '..');

const nodeEnv = process.env.NODE_ENV || 'dev';
const defaultStorage = nodeEnv === 'test'
  ? ':memory:'
  : path.join(projectRoot, 'db', `database.${nodeEnv}.sqlite`);
const storage = process.env.DB_STORAGE || defaultStorage;

if (storage !== ':memory:') {
  fs.mkdirSync(path.dirname(storage), { recursive: true });
}

export const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT || 'sqlite',
  storage,
  logging: process.env.DB_LOGGING === 'true' ? console.log : false,
});

export const Ingredient = sequelize.define('Ingredient', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 255],
      trim(value) {
        if (value.trim().length === 0) {
          throw new Error('Name must contain at least one non-space character.');
        }
      },
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      isInt: true,
    },
  },
}, {
  timestamps: false,
});

const seedTestData = async () => {
  await Ingredient.bulkCreate([
    { name: 'Apples', quantity: 4 },
    { name: 'Bananas', quantity: 6 },
  ]);
};

export async function initDatabase({ forceSync = false } = {}) {
  await sequelize.authenticate();
  const shouldForce = forceSync || nodeEnv === 'test';
  await sequelize.sync({ force: shouldForce, alter: !shouldForce });

  if (nodeEnv === 'test') {
    await seedTestData();
  }

  console.log(`Database ready for use using storage: ${storage}`);
}

export async function closeDatabase() {
  await sequelize.close();
}
