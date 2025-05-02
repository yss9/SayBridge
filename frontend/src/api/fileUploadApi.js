import apiClient from "./index";

const uploadApi = {
    userProfileUpload: (file) => {
        const formData = new FormData();
        formData.append('file', file);
        return apiClient.post('/files/profile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
    },
    teacherProfileUpload: (file) => {
        const formData = new FormData();
        formData.append('file', file);
        return apiClient.post('/files/teacher/profile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
    },
    coursePostFileUpload: (coursePostId, file) => {
        const formData = new FormData();
        formData.append('file', file);
        return apiClient.post(`/files/coursePost/${coursePostId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
    },
    homeworkFileUpload: (file, coursePostId) => {
        const formData = new FormData();
        formData.append('file', file);
        return apiClient.post(`/files/homework/${coursePostId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
    }
};

export {uploadApi}