package com.backend.repository;

import com.backend.entity.CoursePost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CoursePostRepository extends JpaRepository<CoursePost,Long> {
}
