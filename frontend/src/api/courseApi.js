import apiClient from './index';

const courseApi = {
    getCourse: (courseId) => {
        return apiClient.get(`/course/${courseId}`, { withCredentials: true });
    },

    getCourses: (page = 0, size = 9) => {
        return apiClient.get(`/course?page=${page}&size=${size}`, { withCredentials: true });
    },

    getSearchCourses: (language, level, page = 0, size = 6) => {
        const params = new URLSearchParams();
        if (language) params.append('language', language);
        if (level) params.append('level', level);
        params.append('page', page);
        params.append('size', size);

        return apiClient.get(`/course/search?${params.toString()}`, { withCredentials: true });
    },

    getCourseByUserId: () => {
        return apiClient.get('/course/student/list', { withCredentials: true });
    },

    getCourseByTeacherId: (teacherId) => {
        return apiClient.get(`/course/teacher/${teacherId}`, { withCredentials: true });
    },

    createCourse:(courseDto) =>{
        return apiClient.post(`/course/create`,courseDto, {withCredentials:true})
    }
};

const coursePostApi = {
    getCoursePosts:(courseId)=>{
        return apiClient.get(`/post/${courseId}`, {withCredentials:true})
    },

    createCoursePost:(coursePostDto) =>{
        return apiClient.post(`/post/create`, coursePostDto, {withCredentials:true})
    },
    updateCoursePost:(coursePostId, coursePostDto) =>{
        return apiClient.patch(`/post/update/${coursePostId}`, coursePostDto, {withCredentials:true})
    },
    deleteCoursePost:(coursePostId) =>{
        return apiClient.delete(`/post/delete/${coursePostId}`, {withCredentials: true})
    }

}

export { courseApi, coursePostApi };
