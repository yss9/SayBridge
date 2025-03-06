import apiClient from './index';

const reviewApi = {
    getMyReview: () =>
        apiClient.get(`/review/my-reviews`, { withCredentials: true }),
    getCourseReview: (courseId) => {
        return apiClient.get(`/review/course/${courseId}`, { withCredentials: true });
    },
    createReview: (reviewDto) =>
        apiClient.post('/review/create', reviewDto, { withCredentials: true }),
    deleteReview:(reviewId)=>
        apiClient.delete(`/review/delete/${reviewId}`, {withCredentials:true})

};

export { reviewApi };