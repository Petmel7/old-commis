
const paypal = require('@paypal/checkout-server-sdk');
const { client } = require('../config/paypal');
const { Payment, User } = require('../models');

// Функція для обчислення комісії та суми для продавця
const calculateCommission = (amount, rate = 0.1) => {
    const commission = (amount * rate).toFixed(2);
    const sellerAmount = (amount - commission).toFixed(2);
    return { commission, sellerAmount };
};

const createPayPalOrderRequest = (amount, sellerAmount, commission, orderId, currency = 'USD') => {
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");

    // Переконайтеся, що загальна сума дорівнює item_total + інші складові
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            reference_id: `order_${orderId}`,
            amount: {
                currency_code: currency,
                value: amount,  // Загальна сума, яка включає item_total та інші складові
                breakdown: {
                    item_total: { currency_code: currency, value: sellerAmount },  // Сума товарів
                    tax_total: { currency_code: currency, value: "0.00" },         // Податки
                    shipping: { currency_code: currency, value: "0.00" },          // Доставка
                    handling: { currency_code: currency, value: "0.00" },          // Обробка
                    insurance: { currency_code: currency, value: "0.00" },         // Страховка
                    shipping_discount: { currency_code: currency, value: "0.00" }, // Знижка на доставку
                    discount: { currency_code: currency, value: "0.00" },          // Знижка
                    fee: { currency_code: currency, value: commission },           // Комісія
                },
            },
            payee: {
                merchant_id: process.env.PAYPAL_MERCHANT_ID,  // Ваш ID PayPal продавця
            }
        }],
        application_context: {
            return_url: 'https://example.com/your-return-url',  // URL для успішного платежу
            cancel_url: 'https://example.com/your-cancel-url',  // URL для скасованого платежу
        }
    });

    return request;
};

const createPayment = async (req, res, next) => {
    const { amount, currency, orderId, userId } = req.body;

    try {
        console.log('Creating PayPal order with amount:', amount);

        // Обчислення комісії та суми для продавця
        const { commission, sellerAmount } = calculateCommission(amount);

        console.log('Commission:', commission, 'Seller Amount:', sellerAmount);

        // Створюємо запит до PayPal API
        const request = createPayPalOrderRequest(amount, sellerAmount, commission, orderId, currency);

        const order = await client().execute(request);

        console.log('PayPal Order Created:', order);

        // Створюємо запис про платіж у базі даних
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
        next(error);  // Передаємо помилку в централізований обробник
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

