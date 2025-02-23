import apiClient from './index';

const userInfoApi = {
    userInfo:() => apiClient.get('/user/me', { withCredentials:true}),
    verifyPassword:(password) => apiClient.post('/user/verify-password',{password},{withCredentials:true}),
    updateUserProfile: (file) => {
        const formData = new FormData();
        formData.append('file', file); // Spring의 @RequestParam 이름과 일치
        return apiClient.post('/files/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true
        });
    }
};

export {userInfoApi};