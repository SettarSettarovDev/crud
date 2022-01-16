const { Sequelize } = require('sequelize');

const test = process.env.NODE_ENV === 'test';
const sequelize = new Sequelize({
  database: process.env[test ? 'TEST_DB_NAME' : 'DB_NAME'],
  username: process.env[test ? 'TEST_DB_USER' : 'DB_USER'],
  password: process.env[test ? 'TEST_DB_PASSWORD' : 'DB_PASSWORD'],
  host: process.env[test ? 'TEST_DB_HOST' : 'DB_HOST'],
  port: 5432,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelize;
