package com.backend.repository;

import com.backend.entity.Homework;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HomeworkRepository extends JpaRepository<Homework, Long> {

    Optional<Homework> findByStudentIdAndCoursePostId(Long student_id, Long coursePost_id);

}
