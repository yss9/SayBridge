import apiClient from './index';

// 사용자 관련 API 함수들
const userApi = {
    // 사용자 목록 가져오기
    getUsers: () => apiClient.get('/test'),
};

export default userApi;
