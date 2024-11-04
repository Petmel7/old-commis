import api from './api';

export const createPayment = async (dataPayment) => {
    const response = await api.post(`/payments/create`, dataPayment);
    return response.data;
};