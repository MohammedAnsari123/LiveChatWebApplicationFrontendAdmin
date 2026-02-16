import axios from 'axios';

const API = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

API.interceptors.request.use((req) => {
    if (localStorage.getItem('adminInfo')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('adminInfo')).token}`;
    }
    return req;
});

export default API;
