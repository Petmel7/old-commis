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

export const getActiveSellers = async () => {
    const response = await api.get('admin/active-sellers');
    console.log('API getActiveSellers Response:', response.data)
    return response.data
}

export const getActiveSellerById = async (sellerId) => {
    const response = await api.get(`admin/active-sellers/${sellerId}`);
    return response.data;
};


export const getNewSellers = async () => {
    const response = await api.get('admin/new-sellers');
    return response.data
}

export const getBlockedSellers = async () => {
    const response = await api.get('/admin/blocked-sellers');
    return response.data;
};

export const getSellerStatistics = async () => {
    const response = await api.get('/admin/sellers/statistics');
    return response.data;
};

export const staticsSellerById = async (sellerId) => {
    const response = await api.get(`admin/sellers/statistics/${sellerId}`);
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

export const blockProduct = async (productId, isBlocked) => {
    const response = await api.put(`admin/products/block/${productId}`, {
        is_blocked: !isBlocked,
    });
    return response.data;
}

