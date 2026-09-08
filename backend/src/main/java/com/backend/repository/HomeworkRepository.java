package com.backend.repository;

import com.backend.dto.HomeworkAttachmentProjection;
import com.backend.entity.Homework;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface HomeworkRepository extends JpaRepository<Homework, Long> {

    Optional<Homework> findByStudentIdAndCoursePostId(Long student_id, Long coursePost_id);
    List<Homework> findByCoursePostId(Long coursePostId);

    @Query("""
            select h.coursePost.id as coursePostId,
                   h.attachmentUrl as attachmentUrl
            from Homework h
            where h.student.id = :studentId
              and h.coursePost.id in :coursePostIds
            """)
    List<HomeworkAttachmentProjection> findSubmissionAttachments(
            @Param("studentId") Long studentId,
            @Param("coursePostIds") List<Long> coursePostIds
    );
}
