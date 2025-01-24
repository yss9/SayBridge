import axios from 'axios';

// Axios 기본 인스턴스 생성
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/', // Spring Boot API URL
    timeout: 5000, // 요청 타임아웃 설정 (ms)
    headers: {
        'Content-Type': 'application/json', // 기본 헤더 설정
    },
});

export default apiClient;