package com.backend.service;

import com.backend.dto.HomeworkSubmissionDto;
import com.backend.entity.CoursePost;
import com.backend.entity.Homework;
import com.backend.entity.User;
import com.backend.repository.CoursePostRepository;
import com.backend.repository.HomeworkRepository;
import com.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class HomeworkService {

    @Autowired
    private HomeworkRepository homeworkRepository;

    @Autowired
    private CoursePostRepository coursePostRepository;

    @Autowired
    private UserRepository userRepository;

    public Homework getStudentSubmission(Long coursePostId, User currentUser) {
        return homeworkRepository.findByStudentIdAndCoursePostId(currentUser.getId(), coursePostId)
                .orElse(null);
    }

    public List<Homework> getSubmissionsForPost(Long coursePostId) {
        return homeworkRepository.findByCoursePostId(coursePostId);
    }

    public Homework submitHomework(Long coursePostId, Long studentId, String fileUrl) {
        Optional<Homework> optionalHomework = homeworkRepository.findByStudentIdAndCoursePostId(studentId, coursePostId);
        Homework homework;
        if (optionalHomework.isPresent()) {
            homework = optionalHomework.get();
            homework.setAttachmentUrl(fileUrl);
            homework.setSubmittedAt(LocalDateTime.now());
        } else {
            homework = new Homework();
            CoursePost coursePost = coursePostRepository.findById(coursePostId)
                    .orElseThrow(() -> new NoSuchElementException("CoursePost not found"));
            User student = userRepository.findById(studentId)
                    .orElseThrow(() -> new NoSuchElementException("User not found"));
            homework.setCoursePost(coursePost);
            homework.setStudent(student);
            homework.setAttachmentUrl(fileUrl);
            homework.setSubmittedAt(LocalDateTime.now());
            homework.setContent("");
        }
        return homeworkRepository.save(homework);
    }

    public void deleteHomework(Long homeworkId, User currentUser) {
        Homework homework = homeworkRepository.findById(homeworkId)
                .orElseThrow(() -> new NoSuchElementException("Homework not found"));
        if (!homework.getStudent().getId().equals(currentUser.getId())) {
            throw new SecurityException("Unauthorized deletion attempt");
        }
        homeworkRepository.delete(homework);
    }

    public void cancelHomeworkSubmission(Long coursePostId, User currentUser) {
        Homework homework = getStudentSubmission(coursePostId, currentUser);
        if (homework == null) {
            throw new NoSuchElementException("Homework not found for cancellation");
        }
        deleteHomework(homework.getId(), currentUser);
    }


    public Map<Long, String> getStudentSubmissionsMap(List<Long> postIds, User currentUser) {
        Map<Long, String> result = new HashMap<>();
        for (Long postId : postIds) {
            Homework hw = getStudentSubmission(postId, currentUser);
            if (hw != null) {
                result.put(postId, hw.getAttachmentUrl());
            }
        }
        return result;
    }

    public List<HomeworkSubmissionDto> getPostSubmissionsDto(Long coursePostId) {
        List<Homework> submissions = getSubmissionsForPost(coursePostId);
        return submissions.stream()
                .map(hw -> new HomeworkSubmissionDto(
                        hw.getId(),
                        hw.getStudent().getUsername(),
                        hw.getSubmittedAt(),
                        hw.getAttachmentUrl()))
                .collect(Collectors.toList());
    }
}
