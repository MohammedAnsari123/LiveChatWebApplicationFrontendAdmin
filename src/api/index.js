import axios from 'axios';

const API = axios.create({
    baseURL: 'https://modrenlivechatwebapplicationbackend.onrender.com/api',
});

API.interceptors.request.use((req) => {
    if (localStorage.getItem('adminInfo')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('adminInfo')).token}`;
    }
    return req;
});

export default API;
