import api from './api';

export const createOrder = async (data) => {
    const response = await api.post('/orders', data);
    return response.data;
};

export const getSellerOrders = async () => {
    const response = await api.get('/orders/seller');
    return response.data;
};

export const getSellerOrderById = async (id) => {
    const response = await api.get(`/orders/seller/order/${id}`);
    return response.data;
};

export const deleteOrder = async (orderId) => {
    try {
        const response = await api.delete(`/orders/${orderId}`);

        if (response.status === 200 || response.status === 204) {
            return response.data;
        } else {
            throw new Error('Failed to delete order');
        }
    } catch (error) {
        throw error;
    }
};

export const cancelOrderBySeller = async (orderId) => {
    const response = await api.put(`/orders/${orderId}`);
    return response.data;
};

