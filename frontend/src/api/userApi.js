import apiClient from './index';

const userInfoApi = {
    userInfo:() => apiClient.get('/user/me', { withCredentials:true}),
    updateUserProfile: (userUpdateRequest) => apiClient.patch('/user/update',userUpdateRequest,{withCredentials: true})

};

export {userInfoApi};