// import api from './api';

// export const getProducts = async () => {
//     const response = await api.get('/products/all');
//     return response.data;
// };

// export const getProductById = async (productId) => {
//     const response = await api.get(`/products/${productId}`);
//     return response.data;
// };

// export const getUserProducts = async (accessToken) => {
//     const response = await api.get('/products', {
//         headers: {
//             Authorization: `Bearer ${accessToken}`
//         }
//     });
//     return response.data;
// };

// export const searchProducts = async (query) => {
//     const response = await api.get(`/products/search?query=${query}`);
//     return response.data;
// };

// export const addProduct = async (formData) => {
//     const response = await api.post('/products', formData, {
//         headers: {
//             'Content-Type': 'multipart/form-data'
//         }
//     });
//     return response.data;
// };

// export const updateProduct = async (productId, productData) => {
//     const response = await api.patch(`/products/${productId}`, productData);
//     return response.data;
// };

// export const deleteProduct = async (productId) => {
//     const response = await api.delete(`/products/${productId}`);
//     return response.data;
// };

// export const deleteImage = async (productId, indices) => {
//     const response = await api.delete(`/products/${productId}/images`, {
//         data: { indices }
//     });
//     return response.data;
// };


import api from './api';

export const getProducts = async () => {
    const response = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/products/all`);
    return response.data;
};

export const getProductById = async (productId) => {
    const response = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`);
    return response.data;
};

export const getUserProducts = async (accessToken) => {
    const response = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    return response.data;
};

export const searchProducts = async (query) => {
    const response = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/products/search?query=${query}`);
    return response.data;
};

export const addProduct = async (formData) => {
    const response = await api.post(`${process.env.NEXT_PUBLIC_API_URL}/products`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

export const updateProduct = async (productId, productData) => {
    const response = await api.patch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`, productData);
    return response.data;
};

export const deleteProduct = async (productId) => {
    const response = await api.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`);
    return response.data;
};

export const deleteImage = async (productId, indices) => {
    const response = await api.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/images`, {
        data: { indices }
    });
    return response.data;
};