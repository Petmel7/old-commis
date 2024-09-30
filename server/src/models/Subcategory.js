// server/src/models/Subcategory.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Category = require('./Category');  // Підключаємо модель категорії

const Subcategory = sequelize.define('Subcategory', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Category,
            key: 'id'
        },
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'subcategories'
});

module.exports = Subcategory;
