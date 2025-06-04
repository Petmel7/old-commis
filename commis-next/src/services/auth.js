import api from './api';
import { getServerUrl } from '@/utils/env';

console.log('servicesFront->getServerUrl');

export const register = async (data) => {
    const response = await api.post('/users/register', data);
    localStorage.setItem('isRegistered', response.data.isRegistered);
    return response.data;
};

export const login = async (data) => {
    try {
        const response = await api.post('/users/login', data);
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Помилка при вході';
        throw new Error(message);
    }
};

export const googleAuth = async () => {
    window.location.href = `${getServerUrl()}/api/users/google`;
};

export const addPhone = async (data) => {
    const response = await api.post('/users/add-phone', data);
    return response.data;
};

export const confirmEmail = async (data) => {
    const response = await api.post('/users/confirm', data);
    return response.data;
};

export const confirmPhone = async (data) => {
    console.log('confirmPhone->data', data);
    const response = await api.post('/users/confirm-phone', data);
    return response.data;
};

export const getUserProfile = async (accessToken) => {
    const response = await api.get('/users/profile', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    return response.data;
};

export const logoutUser = async (data) => {
    const response = await api.post('/users/logout', data);
    return response.data;
};