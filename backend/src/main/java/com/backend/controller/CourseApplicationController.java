package com.backend.controller;

import com.backend.dto.CourseApplicationDto;
import com.backend.entity.User;
import com.backend.service.AuthService;
import com.backend.service.CourseApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/application")
public class CourseApplicationController {

    @Autowired
    private CourseApplicationService courseApplicationService;

    @Autowired
    private AuthService authService;

    @GetMapping("/list/{courseId}")
    public ResponseEntity<List<CourseApplicationDto>> getCourseApplications(@PathVariable Long courseId) {
        List<CourseApplicationDto> byCourseId = courseApplicationService.findByCourseId(courseId);
        return ResponseEntity.ok(byCourseId);
    }

    @PostMapping("/apply/{courseId}")
    public ResponseEntity<Void> apply(@PathVariable Long courseId, Authentication authentication) {
        User currentUser = authService.getCurrentUser(authentication);
        courseApplicationService.apply(courseId,currentUser);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/accept/{applicationId}")
    public ResponseEntity<Void> accept(@PathVariable Long applicationId) {
        courseApplicationService.accept(applicationId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/reject/{applicationId}")
    public ResponseEntity<Void> reject(@PathVariable Long applicationId) {
        courseApplicationService.reject(applicationId);
        return ResponseEntity.noContent().build();
    }


}
