
import api from './api';

export const createPayment = async (dataPayment) => {
    try {
        const response = await api.post(`/payments/create`, dataPayment);
        return response.data;
    } catch (error) {
        console.error('Error in createPayment:', error);
        throw error;
    }
};

export const createCashPayment = async (data) => {
    const response = await api.post('/payments/cash', data);
    return response.data;
}

