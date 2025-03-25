package com.backend.repository;

import com.backend.entity.CourseEnrollment;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CourseEnrollmentRepository extends CrudRepository<CourseEnrollment,Long> {

    List<CourseEnrollment> findByStudentId(Long studentId);
    List<CourseEnrollment> findByCourseId(Long courseId);
    boolean existsByCourseIdAndStudentId(Long courseId, Long studentId);
    void deleteByCourseIdAndStudentId(Long courseId, Long studentId);
    Long id(Long id);
}
