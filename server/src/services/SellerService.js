const { User, Product, Order } = require('../models');
const { Op } = require('sequelize');
const sequelize = require('../config/db');

const getActiveSellers = async () => {
    const activeSellers = await User.findAll({
        where: {
            role: 'seller',
            is_blocked: false,
            last_login: {
                [Op.gte]: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Активні протягом останніх 30 днів
            }
        },
        include: [
            {
                model: Product,
                as: 'products', // Використовуємо точний alias 'products' як в асоціації
                where: {
                    is_active: true,
                },
                required: true // Продавець повинен мати хоча б один активний товар
            },
            {
                model: Order,
                as: 'orders', // Використовуємо точний alias 'orders' як в асоціації
                where: {
                    status: {
                        [Op.in]: ['shipped', 'completed', 'cancelled']
                    },
                    createdat: {
                        [Op.gte]: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000) // Продажі за останні 6 місяців
                    }
                },
                required: false // Продажі можуть бути відсутніми
            }
        ]
    });
    return activeSellers;
};

const getActiveSellersById = async (sellerId) => {
    const activeSeller = await User.findOne({
        where: {
            id: sellerId,
            role: 'seller',
            is_blocked: false,
            last_login: {
                [Op.gte]: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Активні протягом останніх 30 днів
            }
        },
        include: [
            {
                model: Product,
                as: 'products',  // Вкажіть псевдонім 'as' тут
                where: {
                    is_active: true,
                },
                required: true // Продавець повинен мати хоча б один активний товар
            },
            {
                model: Order,
                as: 'orders',
                where: {
                    status: {
                        [Op.in]: ['shipped', 'completed', 'cancelled']
                    },
                    createdat: {
                        [Op.gte]: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000) // Продажі за останні 6 місяців
                    }
                },
                required: false // Продажі можуть бути відсутніми, але це не обов'язково
            }
        ]
    });

    if (!activeSeller) {
        throw { status: 404, message: 'Seller not found' };
    }

    return activeSeller;
};

const getNewSellers = async (days = 7) => {
    const thresholdDate = new Date();
    thresholdDate.setDate(thresholdDate.getDate() - days);

    // Отримання нових продавців
    const newSellers = await User.findAll({
        where: {
            role: 'seller',
            createdat: {
                [Op.gte]: thresholdDate, // Фільтрація за датою створення
            },
        },
        attributes: ['id', 'name', 'email', 'createdat'], // Вибір потрібних полів
    });

    return newSellers;
};

const getBlockedSellers = async () => {
    const blockedSellers = await User.findAll({
        where: {
            role: 'seller',
            is_blocked: true
        },
        attributes: ['id', 'name', 'email', 'createdat']
    });

    return blockedSellers;
};

const getSellerStatistics = async () => {
    const query = `
            SELECT 
                "User"."id",
                "User"."name",
                "User"."lastname",
                "User"."email",
                COUNT("OrderItems"."id") AS "total_sold_items",
                SUM("OrderItems"."quantity") AS "total_quantity_sold"
            FROM "users" AS "User"
            LEFT OUTER JOIN "products" AS "products" ON "User"."id" = "products"."user_id"
            LEFT OUTER JOIN "order_items" AS "OrderItems" ON "products"."id" = "OrderItems"."product_id"
            GROUP BY "User"."id", "User"."name", "User"."lastname", "User"."email"
            ORDER BY "total_sold_items" DESC;
        `;

    // Виконання запиту через Sequelize
    return await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

};

const getSellerStatisticsById = async (sellerId) => {
    const query = `
        SELECT 
            "User"."id",
            "User"."name",
            "User"."lastname",
            "User"."email",
            COUNT("OrderItems"."id") AS "total_sold_items",
            SUM("OrderItems"."quantity") AS "total_quantity_sold"
        FROM "users" AS "User"
        LEFT OUTER JOIN "products" AS "products" ON "User"."id" = "products"."user_id"
        LEFT OUTER JOIN "order_items" AS "OrderItems" ON "products"."id" = "OrderItems"."product_id"
        WHERE "User"."id" = :sellerId
        GROUP BY "User"."id", "User"."name", "User"."lastname", "User"."email"
        ORDER BY "total_sold_items" DESC;
    `;

    // Виконання запиту через Sequelize
    return await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT,
        replacements: { sellerId }, // Параметр для запиту
    });
};

module.exports = {
    getActiveSellers,
    getActiveSellersById,
    getNewSellers,
    getBlockedSellers,
    getSellerStatistics,
    getSellerStatisticsById
};