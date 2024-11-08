
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
                    where: {
                        is_active: true,
                    },
                    required: true // Продавець повинен мати хоча б один активний товар
                },
                {
                    model: Order,
                    where: {
                        status: {
                            [Op.in]: ['completed', 'shipped', 'delivered']
                        },
                        createdAt: {
                            [Op.gte]: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000) // Продажі за останні 6 місяців
                        }
                    },
                    required: false // Продажі можуть бути відсутніми, але це не обов'язково
                }
            ]
        });

        return res.status(200).json({ status: 'success', data: activeSellers });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getActiveSellers,
};
