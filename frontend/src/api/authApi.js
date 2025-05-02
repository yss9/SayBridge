import apiClient from './index';

const authApi = {
    signup: (userData) => apiClient.post('/auth/signup', userData),
    login: (userData) => apiClient.post('/auth/login', userData),
    logout: () => apiClient.post('/auth/logout', {}),
    verifyPassword:(request) => apiClient.post('/auth/verify-password',request)
};

const checkApi = {
    checkEmail: (email) => apiClient.get(`/auth/email-exists?email=${email}`)
};



export { authApi, checkApi };
