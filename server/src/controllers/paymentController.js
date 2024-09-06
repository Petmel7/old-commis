
const paypal = require('@paypal/checkout-server-sdk');
const { client } = require('../config/paypal');
const { Payment, User } = require('../models');

const createPayment = async (req, res) => {
    const { amount, currency, orderId, userId, sellerId } = req.body;

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");

    const commissionRate = 0.1; // 10% комісії
    const commission = (amount * commissionRate).toFixed(2);
    const sellerAmount = (amount - commission).toFixed(2);

    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            reference_id: `order_${orderId}`,
            amount: {
                currency_code: currency || 'USD',
                value: amount,
                breakdown: {
                    item_total: { currency_code: currency || 'USD', value: sellerAmount },
                    fee: { currency_code: currency || 'USD', value: commission },
                },
            },
            payee: {
                merchant_id: process.env.PAYPAL_MERCHANT_ID,
            }
        }],
        application_context: {
            return_url: 'https://example.com/your-return-url',
            cancel_url: 'https://example.com/your-cancel-url',
        }
    });

    try {
        const order = await client().execute(request);

        const payment = await Payment.create({
            order_id: orderId,
            user_id: userId,
            amount: amount,
            status: 'pending',
            payment_intent_id: order.result.id
        });

        res.status(201).json({
            id: order.result.id,
            links: order.result.links,
            paymentId: payment.id,
        });
    } catch (error) {
        console.error('Error creating PayPal payment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const capturePayment = async (req, res) => {
    const { orderId, sellerId } = req.body;

    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    try {
        const capture = await client().execute(request);

        // Після успішного захоплення, виплатіть продавцю
        const seller = await User.findByPk(sellerId);

        // Використовуйте PayPal Payouts API для переказу коштів продавцю
        // Виплата буде оброблена тут, після вирахування вашої комісії.

        res.status(200).json({
            status: 'success',
            capture: capture.result
        });
    } catch (error) {
        console.error('Error capturing PayPal payment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createPayment,
    capturePayment
};
