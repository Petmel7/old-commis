const { User, Order, Product, OrderItem, RefreshToken } = require('../models');

const getUsersForAdmin = async () => {
    const users = await User.findAll();
    return users;
}

const getUserById = async (id) => {
    const user = await User.findByPk(id);

    if (!user) {
        throw { status: 404, message: 'User not found' };
    }

    return user;
}

const getOrdersForAdmin = async () => {
    const orders = await Order.findAll();

    if (!orders) {
        throw { status: 404, message: 'Orders not found' };
    }

    return orders;
}

const getProductsForAdmin = async (id) => {
    const products = await Order.findAll();

    if (!products) {
        throw { status: 404, message: 'Products not found' };
    }

    return products;
}

const getUserRoleCounts = async () => {

    const users = await User.findAll({
        attributes: ['id', 'name', 'phone', 'email', 'role'],
    });

    const roles = {
        buyer: { title: "Покупці", slug: "buyer", count: 0, users: [] },
        seller: { title: "Продавці", slug: "seller", count: 0, users: [] },
        superadmin: { title: "Адміністратори", slug: "admin", count: 0, users: [] },
    };

    users.forEach(user => {
        const { id, name, phone, email, role } = user;
        if (roles[role]) {
            roles[role].count += 1;
            roles[role].users.push({ id, name, phone, email, role: roles[role].title });
        }
    });

    return Object.values(roles);
};

const getUsersByRole = async (role) => {

    if (!role) {
        throw { status: 400, message: 'Role not specified' };
    }

    const users = await User.findAll({
        where: { role },
        attributes: ['id', 'name', 'email', 'phone', 'role', 'created_at']
    });

    return users;
};

const deleteUserForAdmin = async (userId) => {
    if (!userId) {
        throw { status: 400, message: 'userId not passed in the request' };
    }

    const orders = await Order.findAll({ where: { user_id: userId } });

    const orderIds = orders.map(order => order.id);
    await OrderItem.destroy({ where: { order_id: orderIds } });

    await Order.destroy({ where: { user_id: userId } });

    await RefreshToken.destroy({ where: { user_id: userId } });

    await User.destroy({ where: { id: userId } });
}

const updateUser = async (userId, name, last_name, email, phone, role) => {

    const user = await User.findByPk(userId);
    if (!user) {
        throw { status: 404, message: 'No user found' };
    }

    user.name = name || user.name;
    user.last_name = last_name || user.last_name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.role = role || user.role;

    await user.save();

    return {
        user: {
            id: user.id,
            name: user.name,
            last_name: user.last_name,
            email: user.email,
            phone: user.phone,
            role: user.role,
        },
    };
}

const blockUser = async (userId, is_blocked) => {
    const user = await User.findByPk(userId);
    if (!user) {
        throw { status: 404, message: 'No user found' };
    }

    await user.update({ is_blocked });

    return user;
}

const blockProduct = async (productId, is_blocked) => {
    const product = await Product.findByPk(productId);
    if (!productId) {
        throw { status: 404, message: 'No product found' };
    }

    await product.update({ is_blocked });

    return product;
}

module.exports = {
    getUsersForAdmin,
    getUserById,
    getOrdersForAdmin,
    getProductsForAdmin,
    getUserRoleCounts,
    getUsersByRole,
    deleteUserForAdmin,
    updateUser,
    blockUser,
    blockProduct
}