import apiClient from './index';

const userInfoApi = {
    userInfo: () => {
        return apiClient.get('/user/me');
    },
    updateUserProfile: (userUpdateRequest) => {
        return apiClient.patch('/user/update', userUpdateRequest);
    },
};

const teacherApi = {
    teacherInfo: (teacherId) => {
        return apiClient.get(`/teacher/${teacherId}`);
    },
    updateTeacherProfile: (teacherUpdateRequest) => {
        return apiClient.patch('/teacher/update', teacherUpdateRequest);
    },
};

export { userInfoApi, teacherApi };
