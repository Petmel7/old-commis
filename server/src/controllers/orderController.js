
const { Product, User, Order, OrderItem, Size } = require('../models');
const { createResponse } = require('../utils/response');
const transporter = require('../config/emailConfig');
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

// Функція для надсилання електронної пошти
const sendOrderEmail = async (userEmail, orderId, orderDetails, total) => {
    const baseURL = 'http://localhost:5000/uploads';
    await transporter.sendMail({
        to: userEmail,
        subject: `Ваше замовлення ${orderId} отримано продавцями`,
        html: `
            <h1>Деталі замовлення</h1>
            <table>
                <tr>
                    <th>Фото</th>
                    <th>Назва товару</th>
                    <th>Кількість</th>
                    <th>Ціна</th>
                    <th>Продавець</th>
                </tr>
                ${orderDetails}
            </table>
            <p>Загальна сума: ${total}</p>
        `
    });
};

const createOrder = async (req, res, next) => {
    const { items, address } = req.body;

    try {
        let total = 0;
        let orderDetails = '';
        let sellers = new Set();

        for (let item of items) {
            const product = await getProductAndValidateStock(item.product_id, item.quantity);
            total += product.price * item.quantity;

            const productImageURL = `http://localhost:5000/uploads/${path.basename(product.images[0])}`;
            const seller = await User.findByPk(product.user_id, { attributes: ['name', 'lastname', 'email'] });
            if (seller) sellers.add(seller.email);

            orderDetails +=
                `<tr>
                    <td><img src="${productImageURL}" alt="${product.name}" width="50"/></td>
                    <td>${product.name}</td>
                    <td>${item.quantity}</td>
                    <td>${product.price}</td>
                    <td>${seller.name} ${seller.lastname}</td>
                </tr>`;
        }

        const order = await Order.create({
            user_id: req.user.id,
            total,
            region: address[0].region,
            city: address[0].city,
            postoffice: address[0].postoffice
        });

        for (let item of items) {
            const product = await getProductAndValidateStock(item.product_id, item.quantity);
            await OrderItem.create({
                order_id: order.id,
                product_id: item.product_id,
                quantity: item.quantity,
                price: product.price * item.quantity,
                size: item.size // Зберігаємо розмір продукту
            });

            await product.update({ stock: product.stock - item.quantity });
        }

        await sendOrderEmail(req.user.email, order.id, orderDetails, total);
        res.status(201).json({ message: 'Order created successfully', orderId: order.id });
    } catch (error) {
        next(error);
    }
};

const deleteOrder = async (req, res, next) => {
    const { id } = req.params;

    try {
        const order = await Order.findByPk(id);
        if (!order) {
            // return res.status(404).json({ message: 'Order not found' });
            createResponse(res, 404, 'Order not found');
        }

        const orderItems = await OrderItem.findAll({ where: { order_id: id } });

        for (let item of orderItems) {
            const product = await Product.findByPk(item.product_id);
            await product.update({ stock: product.stock + item.quantity });
        }

        await OrderItem.destroy({ where: { order_id: id } });
        await Order.destroy({ where: { id } });

        // res.status(200).json({ message: 'Order deleted successfully' });
        createResponse(res, 200, 'Order deleted successfully');
    } catch (error) {
        next(error);
    }
};

const getOrder = async (req, res, next) => {
    const { id } = req.params;

    try {
        const order = await Order.findByPk(id, {
            include: [
                {
                    model: OrderItem,
                    include: [Product]
                }
            ]
        });

        if (!order) {
            // return res.status(404).json({ message: 'Order not found' });
            createResponse(res, 404, 'Order not found');
        }

        res.json(order);
    } catch (error) {
        next(error);
    }
};

const getUserOrders = async (req, res, next) => {
    try {
        const orders = await Order.findAll({
            where: { user_id: req.user.id },
            include: [
                {
                    model: OrderItem,
                    include: [Product]
                }
            ]
        });
        res.json(orders);
    } catch (error) {
        next(error);
    }
};

const getSellerOrders = async (req, res, next) => {
    try {
        const sellerOrders = await Order.findAll({
            include: [
                {
                    model: OrderItem,
                    required: true,
                    include: [
                        {
                            model: Product,
                            required: true,
                            where: { user_id: req.user.id },
                            include: [{ model: User, as: 'seller', attributes: ['name', 'email', 'phone'] }]
                        }
                    ]
                },
                {
                    model: User,
                    as: 'buyer',
                    attributes: ['name', 'email', 'phone']
                }
            ]
        });

        const ordersWithBuyerInfo = sellerOrders.map(order => ({
            order_id: order.id,
            buyer_name: order.buyer.name,
            buyer_email: order.buyer.email,
            buyer_phone: order.buyer.phone,
            shipping_address: {
                region: order.region,
                city: order.city,
                postoffice: order.postoffice
            },
            products: order.OrderItems.map(item => ({
                product_name: item.Product.name,
                product_price: item.Product.price,
                product_images: item.Product.images,
                quantity: item.quantity,
                product_size: item.size
            }))
        }));
        res.json(ordersWithBuyerInfo);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createOrder,
    deleteOrder,
    getOrder,
    getUserOrders,
    getSellerOrders
};