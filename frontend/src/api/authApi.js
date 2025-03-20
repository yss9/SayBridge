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



export { authApi, checkApi };
