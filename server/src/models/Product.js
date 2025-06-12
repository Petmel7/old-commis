
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    images: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: true
    },
    subcategory_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'subcategories',
            key: 'id'
        },
        allowNull: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    is_blocked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    timestamps: false,
    tableName: 'products'
});

module.exports = Product;
