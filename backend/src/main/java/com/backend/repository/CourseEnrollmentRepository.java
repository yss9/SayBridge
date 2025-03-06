package com.backend.repository;

import com.backend.entity.CourseEnrollment;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CourseEnrollmentRepository extends CrudRepository<CourseEnrollment,Long> {

    List<CourseEnrollment> findByStudentId(Long studentId);

    Long id(Long id);
}
