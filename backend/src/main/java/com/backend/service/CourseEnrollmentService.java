package com.backend.service;

import com.backend.dto.CourseEnrollmentListDto;
import com.backend.entity.User;
import com.backend.repository.CourseEnrollmentRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseEnrollmentService {

    @Autowired
    private CourseEnrollmentRepository courseEnrollmentRepository;

    public List<CourseEnrollmentListDto> getCourseEnrollmentList(Long courseId){
        List<CourseEnrollmentListDto> dtos = courseEnrollmentRepository.findByCourseId(courseId)
                .stream()
                .map(courseEnrollment -> {
                    CourseEnrollmentListDto dto = new CourseEnrollmentListDto();
                    dto.setId(courseEnrollment.getId());
                    dto.setStudentName(courseEnrollment.getStudent().getUsername());
                    dto.setJoinedAt(courseEnrollment.getJoinedAt());
                    return dto;
                })
                .collect(Collectors.toList());
        return dtos;
    }

    public boolean checkUser(Long courseId, User applicationUser) {
        return courseEnrollmentRepository.existsByCourseIdAndStudentId(courseId, applicationUser.getId());
    }

    @Transactional
    public void withdrawCourse(Long courseId, User student) {
        courseEnrollmentRepository.deleteByCourseIdAndStudentId(courseId, student.getId());
    }

    @Transactional
    public void expelStudent(Long enrollmentId) {
        courseEnrollmentRepository.deleteById(enrollmentId);
    }


}
