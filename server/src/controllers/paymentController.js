
const paypal = require('@paypal/checkout-server-sdk');
const { client } = require('../config/paypal');
const { Payment, User } = require('../models');

// Функція для обчислення комісії та суми для продавця
const calculateCommission = (amount, rate = 0.1) => {
    const commission = (amount * rate).toFixed(2);
    const sellerAmount = (amount - commission).toFixed(2);
    return { commission, sellerAmount };
};

const createPayPalOrderRequest = (amount, totalAmount, orderId, currency = 'USD') => {
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");

    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            reference_id: `order_${orderId}`,
            amount: {
                currency_code: currency,
                value: totalAmount,  // Загальна сума, яка включає item_total
                breakdown: {
                    item_total: { currency_code: currency, value: totalAmount },  // Вся сума включає комісію
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

    return request;
};

// Додайте комісію до sellerAmount для створення повної суми
const createPayment = async (req, res, next) => {
    const { amount, currency, orderId, userId } = req.body;

    try {
        console.log('Creating PayPal order with amount:', amount);

        // Обчислення комісії та суми для продавця
        const { commission, sellerAmount } = calculateCommission(amount);
        const totalAmount = parseFloat(sellerAmount) + parseFloat(commission);

        console.log('Commission:', commission, 'Total Amount:', totalAmount);

        const request = createPayPalOrderRequest(amount, totalAmount, orderId, currency);

        const order = await client().execute(request);

        console.log('PayPal Order Created:', JSON.stringify(order, null, 2));

        const payment = await Payment.create({
            order_id: orderId,
            user_id: userId,
            amount,
            status: 'pending',
            payment_intent_id: order.result.id
        });

        console.log('Payment record created:', payment);

        res.status(201).json({
            id: order.result.id,
            links: order.result.links,
            paymentId: payment.id,
        });
    } catch (error) {
        console.error('Error creating PayPal payment:', error);
        next(error);
    }
};

const capturePayment = async (req, res, next) => {
    const { orderId, sellerId } = req.body;

    try {
        // Захоплюємо платіж через PayPal API
        const request = new paypal.orders.OrdersCaptureRequest(orderId);
        request.requestBody({});
        const capture = await client().execute(request);

        // Знаходимо продавця для виплати
        const seller = await User.findByPk(sellerId);

        // Використайте PayPal Payouts API для переказу коштів продавцю (логіка виплат)
        // Ваша комісія буде відрахована.

        res.status(200).json({
            status: 'success',
            capture: capture.result
        });
    } catch (error) {
        console.error('Error capturing PayPal payment:', error);
        next(error);  // Передача помилки в централізований обробник
    }
};

module.exports = {
    createPayment,
    capturePayment
};

