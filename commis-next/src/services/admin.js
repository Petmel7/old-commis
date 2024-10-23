import api from "./api";

export const getUsersForAdmin = async () => {
    const response = await api.get('admin/users');
    return response.data
}