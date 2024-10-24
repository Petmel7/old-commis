import api from "./api";

export const getUsersForAdmin = async () => {
    const response = await api.get('admin/users');
    return response.data
}

export const getOrdersForAdmin = async () => {
    const response = await api.get('admin/orders');
    return response.data
}

export const getProductsForAdmin = async () => {
    const response = await api.get('admin/products');
    return response.data
}

export const getUserRoleCounts = async () => {
    const response = await api.get('admin/roles');
    return response.data
}

export const getUsersByRole = async (role) => {
    const response = await api.get(`admin/role/${role}`);
    return response.data
}

