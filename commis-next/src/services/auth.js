import api from './api';

export const register = async (data) => {
    const response = await api.post('/users/register', data);
    return response.data;
};

export const login = async (data) => {
    const response = await api.post('/users/login', data);
    return response.data;
};

// export const googleAuth = async (data) => {
//     const response = await api.post('/users/google');
//     localStorage.setItem('token', response.data.refreshToken);
//     console.log('response', response);
//     console.log('localStorage', response.data.refreshToken);
//     return response.data
// }

export const googleAuth = async (data) => {
    const response = await api.post('/users/google', data);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    console.log('response', response);
    console.log('localStorage', response.data.refreshToken);
    return response.data;
};

import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Auth = () => {
    const router = useRouter();

    useEffect(() => {
        const { token } = router.query;
        if (token) {
            localStorage.setItem('token', token);
            router.push('/profile');
        }
    }, [router]);

    return <div>Redirecting...</div>;
};

export default Auth;


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
