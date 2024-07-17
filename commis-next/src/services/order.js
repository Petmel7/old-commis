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
