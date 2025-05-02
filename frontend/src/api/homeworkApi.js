import apiClient from './index';

const homeworkApi = {
    cancelHomeworkSubmission: (coursePostId) => {
        return apiClient.delete(`/homework/${coursePostId}`);
    },

    getStudentSubmissions: (postIds) => {
        const query = postIds.join(",");
        return apiClient.get(`/homework/submissions?postIds=${query}`);
    },

    getPostSubmissions: (coursePostId) => {
        return apiClient.get(`/homework/post/${coursePostId}/submissions`);
    },

    submitHomework: (coursePostId, fileUrl) => {
        return apiClient.post(`/homework/submit/${coursePostId}`, { fileUrl });
    }
};

export { homeworkApi };
