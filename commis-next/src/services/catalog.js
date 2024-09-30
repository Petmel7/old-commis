import api from "./api";

// export const getProductsByCategory = async (category) => {
//     const response = await api.get(`/catalog`, { params: { category } });
//     return response.data;
// };

export const getProductsByCategory = async (category) => {
    const response = await api.get('/catalog', { params: { category } });
    return response.data;
};

export const getCategoryList = async () => {
    const response = await api.get('/catalog/categories');
    return response.data;
};
