'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');

console.info('Instantiating and configuring the Sequelize object instance...');

const options = {
    dialect: 'sqlite',
    storage: 'fsjstd-restapi.db',
};

const sequelize = new Sequelize(options);

const models = {};

// Import all of the models.
fs
    .readdirSync(path.join(__dirname, 'models'))
    .forEach((file) => {
        console.info(`Importing database model from file: ${file}`);
        const model = sequelize.import(path.join(__dirname, 'models', file));
        models[model.name] = model;
    });

// If available, call method to create associations.
Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
        console.info(`Configuring the associations for the ${modelName} model...`);
        models[modelName].associate(models);
    }
});

/** verify connection with database. 
*/
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully (as of Sept 28 2019).');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


module.exports = {
    sequelize,
    Sequelize,
    models,
};