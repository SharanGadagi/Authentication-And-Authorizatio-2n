const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
})

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize,


  db.user = require('../models/user')(sequelize, DataTypes);
db.sequelize.sync({ force: false });

module.exports = db;
