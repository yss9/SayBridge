import apiClient from './index';

const userInfoApi = {
    userInfo: () => {
        return apiClient.get('/user/me', { withCredentials: true });
    },
    updateUserProfile: (userUpdateRequest) => {
        return apiClient.patch('/user/update', userUpdateRequest, { withCredentials: true });
    },
};

const teacherApi = {
    teacherInfo: (teacherId) => {
        return apiClient.get(`/teacher/${teacherId}`, { withCredentials: true });
    },
    updateTeacherProfile: (teacherUpdateRequest) => {
        return apiClient.patch('/teacher/update', teacherUpdateRequest, { withCredentials: true });
    },
};

export { userInfoApi, teacherApi };
