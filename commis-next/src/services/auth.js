import api from './api';

export const register = async (data) => {
    const response = await api.post('/users/register', data);
    return response.data;
};

export const login = async (data) => {
    const response = await api.post('/users/login', data);
    localStorage.setItem('token', response.data.refreshToken);
    console.log('login->refreshToken', response.data.refreshToken);
    return response.data;
};

export const googleAuth = async () => {
    // Виклик для початкового перенаправлення
    window.location.href = 'http://localhost:5000/api/users/google';
};

export const addPhone = async (data) => {
    const response = await api.post('/users/add-phone', data);
    return response.data;
};

export const confirmPhone = async (data) => {
    const response = await api.post('/users/confirm-phone', data);
    return response.data;
};

export const logoutUser = async (data) => {
    const response = await api.post('/users/logout', data);
    return response.data;
};

// export const refreshAccessToken = async () => {
//     const refreshToken = localStorage.getItem('refreshToken');
//     const response = await api.post('/users/refresh-token', { token: refreshToken });
//     return response.data.accessToken;
// };
