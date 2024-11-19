
const { Product, User, Order, OrderItem } = require('../models');
const { createResponse } = require('../utils/response');
const path = require('path');

const OrderService = require('../services/OrderService');
const { sendOrderEmail } = require('../utils/emailUtils');

const createOrder = async (req, res, next) => {
    const { items, address } = req.body;

    try {
        const { order, total, orderDetails } = await OrderService.createOrder(req.user.id, items, address);

        // Надсилання електронного листа
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