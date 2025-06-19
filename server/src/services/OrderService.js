
const { Product, User, Order, OrderItem, Payment } = require('../models');
const renderOrderItem = require('../templates/orderItemTemplate');
const { Op } = require('sequelize');
const path = require('path');

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

const generateOrderDetailsHTML = async (items) => {
    let orderDetails = '';
    const sellers = new Set();

    for (const item of items) {
        const product = await getProductAndValidateStock(item.product_id, item.quantity);
        const seller = await User.findByPk(product.user_id, { attributes: ['name', 'last_name', 'email'] });

        if (seller) sellers.add(seller.email);
        orderDetails += renderOrderItem(product, item, seller);
    }

    return { orderDetails, sellers };
};

const createOrder = async (userId, items, address) => {
    let total = 0;
    const { orderDetails, sellers } = await generateOrderDetailsHTML(items);

    for (const item of items) {
        const product = await getProductAndValidateStock(item.product_id, item.quantity);
        total += product.price * item.quantity;
    }

    const order = await Order.create({
        user_id: userId,
        total,
        region: address[0].region,
        city: address[0].city,
        post_office: address[0].post_office,
    });

    for (const item of items) {
        const product = await getProductAndValidateStock(item.product_id, item.quantity);
        await OrderItem.create({
            order_id: order.id,
            product_id: item.product_id,
            quantity: item.quantity,
            price: product.price * item.quantity,
            size: item.size,
        });
        await product.update({ stock: product.stock - item.quantity });
    }

    return { order, total, orderDetails, sellers };
};

const deleteOrder = async (id) => {
    console.log('☑️id', id);
    const order = await Order.findByPk(id);
    console.log('☑️order', order);
    if (!order) {
        throw { status: 404, message: 'Order not found' };
    }

    const orderItems = await OrderItem.findAll({ where: { order_id: id } });
    console.log('☑️orderItems', orderItems);
    for (let item of orderItems) {
        const product = await Product.findByPk(item.product_id);
        await product.update({ stock: product.stock + item.quantity });
    }
    console.log('☑️{ where: { order_id: id } }', { where: { order_id: id } });
    console.log('☑️{ where: { id } }', { where: { id } });
    await OrderItem.destroy({ where: { order_id: id } });
    await Order.destroy({ where: { id } });
    await Payment.destroy({ where: { order_id: id } });
};

const cancelOrderBySeller = async (id) => {
    const order = await Order.findByPk(id);
    console.log('☑️order', order);
    if (!order) {
        throw { status: 404, message: 'Order not found' };
    }

    await order.update({ status: 'cancelled_by_seller' });
};

const getOrder = async (id) => {
    const order = await Order.findByPk(id, {
        include: [
            {
                model: OrderItem,
                include: [Product]
            }
        ]
    });

    if (!order) {
        throw { status: 404, message: 'Order not found' };
    }

    return order;
}

const getUserOrders = async (userId) => {
    const orders = await Order.findAll({
        where: { user_id: userId },
        include: [
            {
                model: OrderItem,
                include: [Product]
            }
        ]
    });
    return orders;
};

const getSellerOrders = async (sellerId) => {
    console.log('☑️sellerId', sellerId);

    const sellerOrders = await Order.findAll({
        where: {
            status: { [Op.ne]: 'cancelled_by_seller' }
        },
        include: [
            {
                model: OrderItem,
                required: true,
                include: [
                    {
                        model: Product,
                        required: true,
                        where: { user_id: sellerId },
                        include: [
                            {
                                model: User,
                                as: 'seller',
                                attributes: ['name', 'email', 'phone']
                            }
                        ]
                    }
                ]
            },
            {
                model: User,
                as: 'buyer',
                attributes: ['name', 'email', 'phone']
            },
            {
                model: Payment,
                required: false,
                attributes: ['amount', 'status', 'payment_intent_id']
            }
        ]
    });

    return sellerOrders.map(order => ({
        order_id: order.id,
        buyer_name: order.buyer.name,
        buyer_email: order.buyer.email,
        buyer_phone: order.buyer.phone,
        shipping_address: {
            region: order.region,
            city: order.city,
            post_office: order.post_office
        },
        payment: order.Payments?.[0]
            ? {
                amount: order.Payments[0].amount,
                status: order.Payments[0].status,
                intent_id: order.Payments[0].payment_intent_id
            }
            : null,
        products: order.OrderItems.map(item => ({
            product_name: item.Product.name,
            product_price: item.Product.price,
            product_images: item.Product.images,
            quantity: item.quantity,
            product_size: item.size
        }))
    }));
};

module.exports = {
    createOrder,
    deleteOrder,
    cancelOrderBySeller,
    getOrder,
    getUserOrders,
    getSellerOrders,
    getProductAndValidateStock
};