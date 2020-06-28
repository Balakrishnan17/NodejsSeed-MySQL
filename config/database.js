const settings = require('../settings');
const databaseCre = require("./" + settings.environment).DATABASE;
const Sequelize = require("sequelize");
const mysql = require('mysql2');

const path = `mysql://${databaseCre.USER}:${databaseCre.PASSWORD}@${databaseCre.HOST}:${databaseCre.PORT}/${databaseCre.DB}`;

const sequelize = new Sequelize(path, {
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
sequelize.authenticate().then(() => {
    console.log('Connection established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
}).finally(() => {
    //   sequelize.close();
});

module.exports = sequelize;