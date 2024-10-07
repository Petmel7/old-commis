const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Size = sequelize.define('Size', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    size: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'sizes'
});

module.exports = Size;
