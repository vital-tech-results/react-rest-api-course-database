'use strict';

const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
    class User extends Sequelize.Model { }
    User.init({
        //(Integer, primary key, auto- generated)
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        //(STRING)
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please provide a value for "first name"',
                },
                notEmpty: {
                    msg: 'Please provide a value for "first name"',
                },
                is: {
                    args: ["^[a-z]+$", 'i'],
                    msg: 'first name must be only letters',
                },
            },
        },
        //(STRING, nullable)
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please provide a value for "last name"',
                },
                notEmpty: {
                    msg: 'Please provide a value for "last name"',
                },
                is: {
                    args: ["^[a-z]+$", 'i'],
                    msg: 'last name must be only letters',
                },
            },
        },
        //(STRING, nullable)
        emailAddress: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please provide a value for "email"',
                },
                notEmpty: {
                    msg: 'Please provide a value for "email"',
                },
                isEmail: {
                    args: true,
                    msg: 'Please provide a valid email address',
                },
            },
            // credit: https://stackoverflow.com/questions/16356856/sequelize-js-custom-validator-check-for-unique-username-password
            unique: {
                args: true,
                msg: 'Email address already in use!'
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please provide a value for "password"',
                },
                notEmpty: {
                    msg: 'Please provide a value for "password"',
                },
            },
        },

    }, { sequelize });

    //associate with Course model
    User.associate = (models) => {
        User.hasMany(models.Course, {
            foreignKey: {
                fieldName: 'userId',
                allowNull: false,
            },
        });
        
    };
    return User;
};