import api from './api';

export const register = async (data) => {
    const response = await api.post('/users/register', data);
    return response.data;
};

export const login = async (data) => {
    const response = await api.post('/users/login', data);
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    console.log('login->accessToken', response.data.accessToken);
    console.log('login->refreshToken', response.data.refreshToken);
    return response.data;
};

export const googleAuth = async () => {
    // Виклик для початкового перенаправлення
    window.location.href = 'http://localhost:5000/api/users/google';
};

export const addPhone = async (data) => {
    console.log('addPhone->api', api);
    console.log('addPhone->data', data);
    const response = await api.post('/users/add-phone', data);
    return response.data;
};

export const confirmEmail = async (data) => {
    const response = await api.post('/users/confirm', data);
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

