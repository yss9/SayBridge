package com.backend.repository;

import com.backend.entity.Course;
import com.backend.entity.CoursePost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CoursePostRepository extends JpaRepository<CoursePost,Long> {

    List<CoursePost> findCoursePostsByCourseIdOrderByCreatedAtDesc(Course courseId);


}
