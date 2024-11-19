const { Product, User, Order, OrderItem } = require('../models');
const { createResponse } = require('../utils/response');
const path = require('path');

// Функція для перевірки наявності продукту та доступності на складі
const getProductAndValidateStock = async (productId, quantity) => {
    const product = await Product.findByPk(productId);
    if (!product) {
        throw new Error(`Product with id ${productId} not found`);
    }
    if (product.stock < quantity) {
        throw new Error(`Insufficient stock for product ${product.name}. Only ${product.stock} items left.`);
    }
    return product;
};

const createOrder = async (userId, items, address) => {
    let total = 0;
    let orderDetails = '';
    const sellers = new Set();

    // Генеруємо деталі замовлення
    for (const item of items) {
        const product = await getProductAndValidateStock(item.product_id, item.quantity);
        total += product.price * item.quantity;

        const productImageURL = `http://localhost:5000/uploads/${path.basename(product.images[0])}`;
        const seller = await User.findByPk(product.user_id, { attributes: ['name', 'lastname', 'email'] });
        if (seller) sellers.add(seller.email);

        orderDetails += `
            <tr>
                <td><img src="${productImageURL}" alt="${product.name}" width="50"/></td>
                <td>${product.name}</td>
                <td>${item.quantity}</td>
                <td>${product.price}</td>
                <td>${seller.name} ${seller.lastname}</td>
            </tr>`;
    }

    // Створюємо замовлення
    const order = await Order.create({
        user_id: userId,
        total,
        region: address[0].region,
        city: address[0].city,
        postoffice: address[0].postoffice,
    });

    // Додаємо позиції до замовлення
    for (const item of items) {
        const product = await getProductAndValidateStock(item.product_id, item.quantity);
        await OrderItem.create({
            order_id: order.id,
            product_id: item.product_id,
            quantity: item.quantity,
            price: product.price * item.quantity,
            size: item.size,
        });

        // Оновлюємо залишок на складі
        await product.update({ stock: product.stock - item.quantity });
    }

    return { order, total, orderDetails, sellers };
};

module.exports = {
    createOrder,
    getProductAndValidateStock
};