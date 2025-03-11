import apiClient from './index';

const reviewApi = {
    getMyReview: () => {
        return apiClient.get('/review/my-reviews', { withCredentials: true });
    },

    getCourseReview: (courseId) => {
        return apiClient.get(`/review/course/${courseId}`, { withCredentials: true });
    },

    createReview: (reviewDto) => {
        return apiClient.post('/review/create', reviewDto, { withCredentials: true });
    },

    deleteReview: (reviewId) => {
        return apiClient.delete(`/review/delete/${reviewId}`, { withCredentials: true });
    },

    getTeacherReview: (teacherId) => {
        return apiClient.get(`/review/teacher/${teacherId}`, { withCredentials: true });
    },
};

export { reviewApi };
