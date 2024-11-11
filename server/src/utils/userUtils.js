
const { Product } = require('../models');

const updateUserLoginStatus = async (user) => {
    user.last_login = new Date();

    if (user.status === 'inactive') {
        user.status = 'active';
        await Product.update({ is_active: true }, { where: { id: user.id } });
    }

    await user.save();
};

module.exports = { updateUserLoginStatus };
