const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../db_manager');

class User extends Model { }

User.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize, // We need to pass the connection instance
        modelName: 'User', // We need to choose the model name
    },
);

module.exports = User;
