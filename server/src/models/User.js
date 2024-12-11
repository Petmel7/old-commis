
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email_confirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone_confirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    confirmation_code: {
        type: DataTypes.STRING,
        allowNull: true
    },
    google_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'buyer'
    },
    is_blocked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active'
    },
    last_login: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {
    timestamps: false,
    tableName: 'users'
});

module.exports = User;




