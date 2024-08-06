import api from './api';

export const getProducts = async () => {
    const response = await api.get('/products/all');
    return response.data;
};

export const getProductById = async (productId) => {
    const response = await api.get(`/products/${productId}`);
    return response.data;
};

export const getUserProducts = async (accessToken) => {
    const response = await api.get('/products', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    return response.data;
};

export const addProduct = async (formData) => {
    console.log('addProduct->formData', formData);
    const response = await api.post('/products', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

export const updateProduct = async (productId, productData) => {
    const response = await api.patch(`/products/${productId}`, productData);
    return response.data;
};

export const deleteProduct = async (productId) => {
    const response = await api.delete(`/products/${productId}`);
    return response.data;
};

export const deleteImage = async (productId, index) => {
    const response = await api.delete(`/products/${productId}/images/${index}`);
    return response.data;
};