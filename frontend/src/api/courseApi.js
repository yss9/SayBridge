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

};

const courseApplicationApi = {
    getCourseApplicationList:(courseId) =>{
        return apiClient.get(`/application/list/${courseId}`, {withCredentials: true})
    },

    applyCourse:(courseId) =>{
        return apiClient.post(`/application/apply/${courseId}`, [],{withCredentials: true})
    },

    acceptCourseApplication:(applicationId) =>{
        return apiClient.delete(`/application/accept/${applicationId}`, {withCredentials: true})
    },

    rejectCourseApplication:(applicationId) =>{
        return apiClient.delete(`/application/reject/${applicationId}`, {withCredentials: true})
    },

    getMyApplicationList:() =>{
        return apiClient.get(`/application/my`, {withCredentials: true})
    },

    deleteMyApplication:(courseId) =>{
        return apiClient.delete(`/application/delete/${courseId}`, {withCredentials: true})
    },

    checkApplication:(courseId)=>{
        return apiClient.get(`/application/check/${courseId}`, {withCredentials: true})
    }

}

const courseEnrollmentApi = {
    getCourseEnrollmentList:(courseId) =>{
        return apiClient.get(`/enrollment/list/${courseId}`, {withCredentials:true})
    },

    checkCourseEnrollment:(courseId) =>{
        return apiClient.get(`/enrollment/check/${courseId}`, {withCredentials:true})
    },

    withdrawCourseEnrollment:(courseId) =>{
        return apiClient.delete(`/enrollment/withdraw/${courseId}`, {withCredentials:true})
    },

    expelCourseEnrollment:(enrollmentId) =>{
        return apiClient.delete(`/enrollment/expel/${enrollmentId}`, {withCredentials:true})
    },
}

export { courseApi, coursePostApi, courseApplicationApi, courseEnrollmentApi };
