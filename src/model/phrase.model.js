const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../db_manager');

const User = require('./user.model');

class Phrase extends Model { }

Phrase.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        phrase: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        latitude: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        longitude: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Phrase',
        timestamps: false,
    }
);

User.hasMany(Phrase);
Phrase.belongsTo(User);

module.exports = Phrase;