const Sequelize = require('sequelize');

'use strict';

module.exports = (sequelize) => {
    class Course extends Sequelize.Model { }
    Course.init({
        //(Integer, primary key, auto- generated)
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        //(STRING)
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please provide a value for "course title"',
                },
                notEmpty: {
                    msg: 'Please provide a value for "course title"',
                },
            },
        },
        //(Text)
        description: {
            type: Sequelize.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please provide a value for "course description"',
                },
                notEmpty: {
                    msg: 'Please provide a value for "course description"',
                },
            },
        },
        //(STRING, nullable)
        estimatedTime: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        //(STRING, nullable)
        materialsNeeded: {
            type: Sequelize.STRING,
            allowNull: true,
        },
       
    }, { sequelize });

    Course.associate = (models) => {
        Course.belongsTo(models.User, {
            foreignKey: {
                fieldName: 'userId',
                allowNull: false,
            },
        });
        
    };

    return Course;
};
