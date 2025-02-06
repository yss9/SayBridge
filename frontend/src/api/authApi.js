import apiClient from './index';

const authApi = {
    signup: (userData) => apiClient.post('/auth/signup', userData),
    login: (userData) => apiClient.post('/auth/login', userData, { withCredentials: true })
};

const checkApi = {
    checkEmail: (email) => apiClient.get(`/auth/email-exists?email=${email}`)
};

const userInfoApi = {
   userInfo:() => apiClient.get('/user/me', { withCredentials:true})
};

export { authApi, checkApi,userInfoApi };
