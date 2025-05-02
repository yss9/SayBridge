import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL + '/api',
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,   // ← 모든 요청에 쿠키 전송
});

export default apiClient;
