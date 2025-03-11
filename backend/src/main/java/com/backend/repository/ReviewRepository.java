package com.backend.repository;

import com.backend.entity.Review;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends CrudRepository<Review,Long> {

    List<Review> findAllByUserId(Long userId);

    List<Review> findAllByCourseId(Long courseId);

    List<Review> findByCourseTeacherId(Long teacherId);
}
