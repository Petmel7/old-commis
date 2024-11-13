
const { User, Product, Order } = require('../models');
const { Op } = require('sequelize');

const getActiveSellers = async (req, res, next) => {
    try {
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

        return res.status(200).json({ status: 'success', data: activeSellers });
    } catch (error) {
        next(error);
    }
};

const getActiveSellersById = async (req, res, next) => {
    try {
        const { sellerId } = req.params;
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
            return res.status(404).json({ status: 'error', message: 'Seller not found' });
        }

        return res.status(200).json({ status: 'success', data: activeSeller });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getActiveSellers,
    getActiveSellersById,
};

