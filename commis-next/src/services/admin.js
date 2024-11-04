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

export const getUserById = async (userId) => {
    const response = await api.get(`admin/users/${userId}`);
    return response.data
}

export const deleteUser = async (userId) => {
    const response = await api.delete(`admin/users/${userId}`);
    return response.data
}

export const updateUser = async (userId, formData) => {
    const response = await api.patch(`admin/users/update/${userId}`, formData);
    return response.data;
};

export const blockUser = async (userId, isBlocked) => {
    const response = await api.put(`admin/users/block/${userId}`, {
        is_blocked: !isBlocked,
    });
    return response.data;
}


