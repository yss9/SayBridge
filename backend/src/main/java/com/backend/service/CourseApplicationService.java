package com.backend.service;

import com.backend.dto.CourseApplicationDto;
import com.backend.dto.UserCourseApplicationDto;
import com.backend.entity.Course;
import com.backend.entity.CourseApplication;
import com.backend.entity.CourseEnrollment;
import com.backend.entity.User;
import com.backend.repository.CourseApplicationRepository;
import com.backend.repository.CourseEnrollmentRepository;
import com.backend.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseApplicationService {

    @Autowired
    private CourseApplicationRepository courseApplicationRepository;

    @Autowired
    private CourseEnrollmentRepository courseEnrollmentRepository;

    @Autowired
    private CourseRepository courseRepository;

    public List<CourseApplicationDto> findByCourseId(Long courseId) {
        List<CourseApplicationDto> dtos = courseApplicationRepository.findAllByCourseId(courseId)
                .stream()
                .map(courseApplication -> {
                    CourseApplicationDto dto = new CourseApplicationDto();
                    dto.setId(courseApplication.getId());
                    dto.setCourseId(courseApplication.getCourse().getId());
                    dto.setStudentName(courseApplication.getStudent().getUsername());
                    dto.setAppliedAt(courseApplication.getAppliedAt());
                    return dto;
                })
                .collect(Collectors.toList());
        return dtos;
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

    @Transactional
    public void reject(Long courseApplicationId) {
        CourseApplication courseApplication = courseApplicationRepository.findById(courseApplicationId)
                .orElseThrow(() -> new RuntimeException("Course application not found"));

        courseApplicationRepository.delete(courseApplication);
    }

    public List<UserCourseApplicationDto> findByUser(User user) {
        List<UserCourseApplicationDto> dtos = courseApplicationRepository.findAllByStudentId(user.getId())
                .stream()
                .map(courseApplication -> {
                    UserCourseApplicationDto dto = new UserCourseApplicationDto();
                    dto.setId(courseApplication.getId());
                    dto.setCourseId(courseApplication.getCourse().getId());
                    dto.setCourseName(courseApplication.getCourse().getTitle());
                    dto.setTeacherName(courseApplication.getCourse().getTeacher().getUser().getUsername());
                    dto.setAppliedAt(courseApplication.getAppliedAt());
                    return dto;
                })
                .collect(Collectors.toList());
        return dtos;

    }

    @Transactional
    public void delete(Long courseId, User applicationUser) {
        courseApplicationRepository.deleteByCourseIdAndStudentId(courseId, applicationUser.getId());
    }

    public boolean check(Long courseId, User applicationUser) {
        return courseApplicationRepository.existsByCourseIdAndStudent(courseId, applicationUser);
    }


}
