import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;



// import axios from 'axios';
// import { refreshAccessToken } from './auth';

// const api = axios.create({
//     baseURL: 'http://localhost:5000/api',
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// api.interceptors.request.use(async (config) => {
//     let accessToken = localStorage.getItem('accessToken');
//     if (!accessToken) {
//         accessToken = await refreshAccessToken();
//         localStorage.setItem('accessToken', accessToken);
//     }
//     config.headers.Authorization = `Bearer ${accessToken}`;
//     return config;
// }, (error) => {
//     return Promise.reject(error);
// });

// export default api;
