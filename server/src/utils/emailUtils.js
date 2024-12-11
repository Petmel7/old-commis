const transporter = require('../config/emailConfig');

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

module.exports = { sendOrderEmail };