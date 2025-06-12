import api from './api';

export const getProducts = async (page = 1, limit = 10) => {
    const response = await api.get('/products/all', {
        params: {
            page,
            limit
        }
    });
    return response.data;
};

export const getUserProducts = async (accessToken, page = 1, limit = 10) => {
    const response = await api.get('/products', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
        params: {
            page,
            limit
        }
    });
    return response.data;
};

export const getProductById = async (productId) => {
    const response = await api.get(`/products/${productId}`);
    return response.data;
};

export const searchProducts = async (query) => {
    const response = await api.get(`/products/search?query=${query}`);
    return response.data;
};

export const addProduct = async (productData) => {
    const response = await api.post('/products', productData);
    return response.data;
};

export const updateProduct = async (productId, productData) => {
    const response = await api.patch(`/products/${productId}`, productData);
    console.log('updateProduct->response', response);
    return response.data;
};

export const deleteProduct = async (productId) => {
    const response = await api.delete(`/products/${productId}`);
    return response.data;
};

export const deleteImage = async (productId, indices) => {
    const response = await api.delete(`/products/${productId}/images`, {
        data: { indices }
    });
    return response.data;
};