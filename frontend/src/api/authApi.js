import apiClient from './index';

const authApi = {
    signup: (userData) => apiClient.post('/auth/signup', userData),
    login: (userData) => apiClient.post('/auth/login', userData, { withCredentials: true }),
    logout: () => apiClient.post('/auth/logout', {},{ withCredentials: true }),
    verifyPassword:(request) => apiClient.post('/auth/verify-password',request,{withCredentials:true})
};

const checkApi = {
    checkEmail: (email) => apiClient.get(`/auth/email-exists?email=${email}`)
};


const uploadApi = {
    fileUpload: (file) => {
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

export { authApi, checkApi, uploadApi };
