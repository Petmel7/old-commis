import api from "./api";

export const getProductsByCategory = async (category) => {
    const response = await api.get('/catalog', { params: { category } });
    console.log('getProductsByCategory->response', response);
    return response.data;
};

// Отримати категорію за ID підкатегорії
export const getCategoryBySubcategoryId = async (subcategoryId) => {
    const response = await api.get(`/catalog/categories/by-subcategory/${subcategoryId}`);
    return response.data;
};

// Отримати підкатегорію за її ID
export const getSubcategoryById = async (subcategoryId) => {
    const response = await api.get(`/catalog/subcategories/${subcategoryId}`);
    return response.data;
};