
// const paypal = require('@paypal/checkout-server-sdk');
// const { client } = require('../config/paypal');
// const Payment = require('../models/Payment');

// const createPayment = async (req, res) => {
//     const { amount, currency, orderId, userId } = req.body;

//     const request = new paypal.orders.OrdersCreateRequest();
//     request.prefer("return=representation");
//     request.requestBody({
//         intent: 'CAPTURE',
//         purchase_units: [{
//             amount: {
//                 currency_code: currency || 'USD',
//                 value: amount
//             }
//         }]
//     });

//     try {
//         // Виконуємо запит до PayPal для створення платежу
//         const order = await client().execute(request);

//         // Зберігаємо інформацію про платіж у базі даних
//         const payment = await Payment.create({
//             order_id: orderId,
//             user_id: userId,
//             amount: amount,
//             status: 'pending', // Ставимо статус "pending", поки платіж не підтверджено
//             payment_intent_id: order.result.id // Зберігаємо PayPal order ID
//         });

//         // Відповідаємо клієнту з інформацією про платіж та посиланнями PayPal
//         res.status(201).json({
//             id: order.result.id,
//             links: order.result.links,
//             paymentId: payment.id // Додаємо ID платежу з бази даних
//         });
//     } catch (error) {
//         console.error('Error creating PayPal payment:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

const paypal = require('@paypal/checkout-server-sdk');
const { client } = require('../config/paypal');
const Payment = require('../models/Payment');

const createPayment = async (req, res) => {
    const { amount, currency, orderId, userId } = req.body;

    // Формуємо запит для створення PayPal замовлення
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            reference_id: `order_${orderId}`,  // Додаємо reference_id для зв'язку з вашим orderId
            amount: {
                currency_code: currency || 'USD', // Встановлюємо валюту
                value: amount  // Встановлюємо суму
            },
            description: `Order #${orderId} for user #${userId}`,  // Додаємо опис замовлення
            payee: {
                merchant_id: process.env.PAYPAL_MERCHANT_ID, // Додаємо ваш Merchant ID
            }
        }],
        application_context: {
            return_url: 'https://example.com/your-return-url',  // URL для повернення після успішної оплати
            cancel_url: 'https://example.com/your-cancel-url',  // URL для скасування платежу
        }
    });

    try {
        // Виконуємо запит до PayPal для створення замовлення
        const order = await client().execute(request);

        // Зберігаємо інформацію про платіж у базі даних
        const payment = await Payment.create({
            order_id: orderId,
            user_id: userId,
            amount: amount,
            status: 'pending', // Встановлюємо статус "pending", поки платіж не підтверджено
            payment_intent_id: order.result.id // Зберігаємо PayPal order ID
        });

        // Відповідаємо клієнту з інформацією про платіж та посиланнями PayPal
        res.status(201).json({
            id: order.result.id,
            links: order.result.links,
            paymentId: payment.id // Додаємо ID платежу з бази даних
        });
    } catch (error) {
        console.error('Error creating PayPal payment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const capturePayment = async (req, res) => {
    const { orderId } = req.body;

    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    try {
        const capture = await client().execute(request);
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

