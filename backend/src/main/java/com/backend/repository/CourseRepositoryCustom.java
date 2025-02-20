package com.backend.repository;

import com.backend.dto.CourseSearchResponse;
import com.backend.entity.Course;
import com.backend.entity.CourseLevel;
import com.backend.entity.Language;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface CourseRepositoryCustom {
    List<CourseSearchResponse> searchCourses(Language language, CourseLevel level);
}
