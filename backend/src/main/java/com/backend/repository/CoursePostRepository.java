package com.backend.repository;

import com.backend.entity.CoursePost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CoursePostRepository extends JpaRepository<CoursePost,Long> {

    List<CoursePost> findCoursePostsByCourseId(Long courseId);

}
