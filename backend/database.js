const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sqlite:ProjectManager.db');

module.exports = sequelize;