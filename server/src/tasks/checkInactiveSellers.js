// src/tasks/checkInactiveSellers.js
const { User, Product } = require('../models');
const { Op } = require('sequelize');

const checkInactiveSellers = async () => {
    const inactiveThreshold = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 днів тому

    try {
        const sellers = await User.findAll({
            where: {
                role: 'seller',
                last_login: { [Op.lt]: inactiveThreshold },
                status: 'active'
            }
        });

        for (const seller of sellers) {
            await seller.update({ status: 'inactive' });
            await Product.update({ is_active: false }, { where: { seller_id: seller.id } });
        }

        console.log('Inactive sellers have been updated successfully.');
    } catch (error) {
        console.error('Error updating inactive sellers:', error);
    }
};

module.exports = checkInactiveSellers;
