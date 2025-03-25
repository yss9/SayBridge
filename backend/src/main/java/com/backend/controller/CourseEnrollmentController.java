package com.backend.controller;

import com.backend.dto.CourseEnrollmentListDto;
import com.backend.entity.User;
import com.backend.repository.CourseEnrollmentRepository;
import com.backend.service.AuthService;
import com.backend.service.CourseEnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enrollment")
public class CourseEnrollmentController {

    @Autowired
    private CourseEnrollmentService courseEnrollmentService;

    @Autowired
    private AuthService authService;

    @GetMapping("/list/{courseId}")
    public ResponseEntity<List<CourseEnrollmentListDto>> getCourseEnrollmentList(@PathVariable Long courseId) {
        return ResponseEntity.ok(courseEnrollmentService.getCourseEnrollmentList(courseId));
    }

    @GetMapping("/check/{courseId}")
    public ResponseEntity<Boolean> check(@PathVariable Long courseId, Authentication authentication) {
        User currentUser = authService.getCurrentUser(authentication);
        return ResponseEntity.ok(courseEnrollmentService.checkUser(courseId, currentUser));
    }

    @DeleteMapping("/withdraw/{courseId}")
    public ResponseEntity<Void> withdraw(@PathVariable Long courseId, Authentication authentication) {
        User currentUser = authService.getCurrentUser(authentication);
        courseEnrollmentService.withdrawCourse(courseId, currentUser);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/expel/{enrollmentId}")
    public ResponseEntity<Void> expel(@PathVariable Long enrollmentId) {
        courseEnrollmentService.expelStudent(enrollmentId);
        return ResponseEntity.noContent().build();
    }



}
