package com.backend.repository;

import com.backend.entity.CourseApplication;
import com.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseApplicationRepository extends JpaRepository<CourseApplication, Long> {

    List<CourseApplication> findAllByCourseId(Long courseId);
    List<CourseApplication> findAllByStudentId(Long studentId);
    void deleteByCourseIdAndStudentId(Long courseId, Long studentId);
    boolean existsByCourseIdAndStudent(Long courseId, User student);
}
