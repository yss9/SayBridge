import apiClient from './index';

const reviewApi = {
    getMyReview: () => {
        return apiClient.get('/review/my-reviews');
    },

    getCourseReview: (courseId) => {
        return apiClient.get(`/review/course/${courseId}`);
    },

    createReview: (reviewDto) => {
        return apiClient.post('/review/create', reviewDto);
    },

    deleteReview: (reviewId) => {
        return apiClient.delete(`/review/delete/${reviewId}`);
    },

    getTeacherReview: (teacherId) => {
        return apiClient.get(`/review/teacher/${teacherId}`);
    },
};

export { reviewApi };
