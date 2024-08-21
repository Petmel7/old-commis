// import api from './api';

// // Функція для створення платежу
// export const createPayment = async (orderId) => {
//     const response = await api.post(`/payments/create`, {

//         body: JSON.stringify({
//             order_id: orderId,
//             amount: calculateTotalCartPrice(cart),
//         }),
//     });
//     return response.data;
// };