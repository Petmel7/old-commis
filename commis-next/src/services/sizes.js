import api from './api';

export const getSizesByProductId = async (productId) => {
    const response = await api.get(`/products/${productId}/sizes`);
    return response.data;
};

export const addSizeToProduct = async (productId, sizes) => {
    const response = await api.post(`/products/${productId}/sizes`, { sizes });
    return response.data;
};