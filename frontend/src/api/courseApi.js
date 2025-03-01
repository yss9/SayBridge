import apiClient from './index';

const courseApi = {
    getCourses: (page = 0, size = 9) =>
        apiClient.get(`/course?page=${page}&size=${size}`, { withCredentials: true }),
    // courseApi.js 수정
    getSearchCourses: (language, level, page = 0, size = 6) => {
        const params = new URLSearchParams();
        if (language) params.append('language', language);
        if (level) params.append('level', level);
        params.append('page', page);
        params.append('size', size);
        return apiClient.get(`/course/search?${params.toString()}`, { withCredentials: true });
    },
    getCourseByUserId:()=>
        apiClient.get('/course/student/list', {withCredentials:true})
};

export { courseApi };