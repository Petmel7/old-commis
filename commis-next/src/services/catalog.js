import api from "./api";

export const getProductsByCategory = async (category) => {
    const response = await api.get(`/catalog`, { params: { category } });
    return response.data;
};
