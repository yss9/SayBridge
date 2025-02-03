import apiClient from './index';

// 사용자 관련 API 함수들
const userApi = {
    // 회원가입 요청
    signup: (userData) => apiClient.post('/auth/signup', userData),
};

// 이메일 중복 확인 API
const checkApi = {
    checkEmail: (email) => apiClient.get(`/auth/email-exists?email=${email}`)
};

export { userApi, checkApi };
