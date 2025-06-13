
const transporter = require('../config/emailConfig');

const sendOrderEmail = async (userEmail, orderId, orderDetailsHtmlString, total) => {
    const htmlContent = `
        <h2 style="margin-bottom: 10px;">Деталі замовлення №${orderId}</h2>

        <table style="width: 100%; border-collapse: collapse;">
            ${orderDetailsHtmlString}
        </table>

        <p style="margin-top: 20px; font-weight: bold;">Загальна сума: ${total} грн</p>
    `;

    await transporter.sendMail({
        to: userEmail,
        subject: `Ваше замовлення №${orderId} отримано`,
        html: htmlContent,
    });
};

module.exports = { sendOrderEmail };