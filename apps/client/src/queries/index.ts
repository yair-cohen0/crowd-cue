import axios from 'axios';

const mode = import.meta.env.MODE;

export const API_URL =
    mode === 'production' ? new URL(window.location.href).origin + '/api' : 'http://localhost:3000/api';

export const axiosInstance = axios.create({
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
});
