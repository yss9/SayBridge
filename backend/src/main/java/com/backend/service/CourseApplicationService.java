package com.backend.service;

import com.backend.dto.CourseApplicationDto;
import com.backend.entity.Course;
import com.backend.entity.CourseApplication;
import com.backend.entity.CourseEnrollment;
import com.backend.entity.User;
import com.backend.repository.CourseApplicationRepository;
import com.backend.repository.CourseEnrollmentRepository;
import com.backend.repository.CourseRepository;
import com.backend.repository.TeacherProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CourseApplicationService {

    @Autowired
    private CourseApplicationRepository courseApplicationRepository;

    @Autowired
    private CourseEnrollmentRepository courseEnrollmentRepository;

    @Autowired
    private CourseRepository courseRepository;

    public List<CourseApplicationDto> findByCourseId(Long courseId) {
        return courseApplicationRepository.findAllByCourseId(courseId);
    }

    public void apply(Long courseId, User applicationUser) {
        CourseApplication courseApplication = new CourseApplication();
        Course course = courseRepository.findById(courseId).orElseThrow(() -> new RuntimeException("Course not found"));
        courseApplication.setCourse(course);
        courseApplication.setStudent(applicationUser);
        courseApplicationRepository.save(courseApplication);
    }

    @Transactional
    public void accept(Long courseApplicationId) {
        CourseApplication courseApplication = courseApplicationRepository.findById(courseApplicationId).orElseThrow();
        CourseEnrollment courseEnrollment = new CourseEnrollment();
        courseEnrollment.setCourse(courseApplication.getCourse());
        courseEnrollment.setStudent(courseApplication.getStudent());
        courseEnrollmentRepository.save(courseEnrollment);
        courseApplicationRepository.delete(courseApplication);
    }

    public void reject(Long courseApplicationId) {
        CourseApplication courseApplication = courseApplicationRepository.findById(courseApplicationId)
                .orElseThrow(() -> new RuntimeException("Course application not found"));

        courseApplicationRepository.delete(courseApplication);
    }


}
