import api from './api';

export const createOrder = async (data) => {
    console.log('createOrder->data', data)
    const response = await api.post('/orders', data);
    return response.data;
};

export const getSellerOrders = async () => {
    const response = await api.get('/orders/seller');
    console.log('getSellerOrders->response', response)
    return response.data;
};

// export const deleteOrder = async (orderId) => {
//     const response = await api.delete(`/orders/${orderId}`);
//     console.log('deleteOrder->response', response);
//     return response.data;
// };

export const deleteOrder = async (orderId) => {
    try {
        const response = await api.delete(`/orders/${orderId}`);
        console.log('deleteOrder->response', response);

        // Перевіряємо, чи відповідь має статус 200 або 204, що вказує на успішне видалення
        if (response.status === 200 || response.status === 204) {
            return response.data;
        } else {
            throw new Error('Failed to delete order');
        }
    } catch (error) {
        console.error('deleteOrder->error', error);
        throw error;
    }
};

