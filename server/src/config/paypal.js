const paypal = require('@paypal/checkout-server-sdk');

// Створення середовища (sandbox або live)
function environment() {
    let clientId = process.env.PAYPAL_CLIENT_ID;
    let clientSecret = process.env.PAYPAL_CLIENT_SECRET;

    return new paypal.core.SandboxEnvironment(clientId, clientSecret);
    // Для production середовища використовуйте:
    // return new paypal.core.LiveEnvironment(clientId, clientSecret);
}

// Створення клієнта PayPal
function client() {
    return new paypal.core.PayPalHttpClient(environment());
}

module.exports = { client };
