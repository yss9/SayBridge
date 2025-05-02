import apiClient from './index';

const courseApi = {
    getCourse: (courseId) => {
        return apiClient.get(`/course/${courseId}`);
    },

    getCourses: (page = 0, size = 9) => {
        return apiClient.get(`/course?page=${page}&size=${size}`);
    },

    getSearchCourses: (language, level, page = 0, size = 6) => {
        const params = new URLSearchParams();
        if (language) params.append('language', language);
        if (level) params.append('level', level);
        params.append('page', page);
        params.append('size', size);

        return apiClient.get(`/course/search?${params.toString()}`);
    },

    getCourseByUserId: () => {
        return apiClient.get('/course/student/list');
    },

    getCourseByTeacherId: (teacherId) => {
        return apiClient.get(`/course/teacher/${teacherId}`);
    },

    createCourse:(courseDto) =>{
        return apiClient.post(`/course/create`,courseDto)
    }
};

const coursePostApi = {
    getCoursePosts:(courseId)=>{
        return apiClient.get(`/post/${courseId}`)
    },

    createCoursePost:(coursePostDto) =>{
        return apiClient.post(`/post/create`, coursePostDto)
    },
    updateCoursePost:(coursePostId, coursePostDto) =>{
        return apiClient.patch(`/post/update/${coursePostId}`, coursePostDto)
    },
    deleteCoursePost:(coursePostId) =>{
        return apiClient.delete(`/post/delete/${coursePostId}`)
    }

};

const courseApplicationApi = {
    getCourseApplicationList:(courseId) =>{
        return apiClient.get(`/application/list/${courseId}`)
    },

    applyCourse:(courseId) =>{
        return apiClient.post(`/application/apply/${courseId}`, [])
    },

    acceptCourseApplication:(applicationId) =>{
        return apiClient.delete(`/application/accept/${applicationId}`)
    },

    rejectCourseApplication:(applicationId) =>{
        return apiClient.delete(`/application/reject/${applicationId}`)
    },

    getMyApplicationList:() =>{
        return apiClient.get(`/application/my`)
    },

    deleteMyApplication:(courseId) =>{
        return apiClient.delete(`/application/delete/${courseId}`)
    },

    checkApplication:(courseId)=>{
        return apiClient.get(`/application/check/${courseId}`)
    }

}

const courseEnrollmentApi = {
    getCourseEnrollmentList:(courseId) =>{
        return apiClient.get(`/enrollment/list/${courseId}`)
    },

    checkCourseEnrollment:(courseId) =>{
        return apiClient.get(`/enrollment/check/${courseId}`)
    },

    withdrawCourseEnrollment:(courseId) =>{
        return apiClient.delete(`/enrollment/withdraw/${courseId}`)
    },

    expelCourseEnrollment:(enrollmentId) =>{
        return apiClient.delete(`/enrollment/expel/${enrollmentId}`)
    },
}

export { courseApi, coursePostApi, courseApplicationApi, courseEnrollmentApi };
