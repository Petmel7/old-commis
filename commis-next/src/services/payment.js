import api from './api';

export const createPayment = async (dataPayment) => {
    console.log('Services->createPayment', dataPayment);
    const response = await api.post(`/payments/create`, dataPayment)
    return response.data;
};