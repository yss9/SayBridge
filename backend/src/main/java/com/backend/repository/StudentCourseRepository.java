package com.backend.repository;

import com.backend.entity.StudentCourse;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface StudentCourseRepository extends CrudRepository<StudentCourse,Long> {

    List<StudentCourse> findByStudentId(Long studentId);

    Long id(Long id);
}
