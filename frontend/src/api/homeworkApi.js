import apiClient from './index';

const homeworkApi = {
    cancelHomeworkSubmission: (coursePostId) => {
        return apiClient.delete(`/homework/${coursePostId}`, { withCredentials: true });
    },

    getStudentSubmissions: (postIds) => {
        const query = postIds.join(",");
        return apiClient.get(`/homework/submissions?postIds=${query}`, { withCredentials: true });
    },

    getPostSubmissions: (coursePostId) => {
        return apiClient.get(`/homework/post/${coursePostId}/submissions`, { withCredentials: true });
    },

    submitHomework: (coursePostId, fileUrl) => {
        return apiClient.post(`/homework/submit/${coursePostId}`, { fileUrl }, { withCredentials: true });
    }
};

export { homeworkApi };
