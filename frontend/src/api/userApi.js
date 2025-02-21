import apiClient from './index';

const userInfoApi = {
    userInfo:() => apiClient.get('/user/me', { withCredentials:true})
};

export {userInfoApi};