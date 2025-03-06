package com.backend.repository;

import com.backend.dto.CourseApplicationDto;
import com.backend.entity.CourseApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseApplicationRepository extends JpaRepository<CourseApplication, Long> {

    List<CourseApplicationDto> findAllByCourseId(Long courseId);

}
