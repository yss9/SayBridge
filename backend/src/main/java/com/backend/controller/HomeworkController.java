package com.backend.controller;

import com.backend.dto.HomeworkSubmissionDto;
import com.backend.entity.Homework;
import com.backend.entity.User;
import com.backend.service.AuthService;
import com.backend.service.HomeworkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/homework")
public class HomeworkController {

    @Autowired
    private HomeworkService homeworkService;

    @Autowired
    private AuthService authService;

    @PostMapping("/submit/{coursePostId}")
    public ResponseEntity<Homework> submitHomework(@PathVariable Long coursePostId,
                                                   @RequestBody Map<String, String> body,
                                                   Authentication authentication) {
        String fileUrl = body.get("fileUrl");
        User currentUser = authService.getCurrentUser(authentication);
        Homework homework = homeworkService.submitHomework(coursePostId, currentUser.getId(), fileUrl);
        return ResponseEntity.ok(homework);
    }


    @DeleteMapping("/{coursePostId}")
    public ResponseEntity<?> cancelHomeworkSubmission(@PathVariable Long coursePostId, Authentication authentication) {
        User currentUser = authService.getCurrentUser(authentication);
        homeworkService.cancelHomeworkSubmission(coursePostId, currentUser);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/submissions")
    public ResponseEntity<Map<Long, String>> getStudentSubmissions(@RequestParam("postIds") List<Long> postIds,
                                                                   Authentication authentication) {
        User currentUser = authService.getCurrentUser(authentication);
        Map<Long, String> submissions = homeworkService.getStudentSubmissionsMap(postIds, currentUser);
        return ResponseEntity.ok(submissions);
    }

    @GetMapping("/post/{coursePostId}/submissions")
    public ResponseEntity<List<HomeworkSubmissionDto>> getPostSubmissions(@PathVariable Long coursePostId) {
        List<HomeworkSubmissionDto> dtoList = homeworkService.getPostSubmissionsDto(coursePostId);
        return ResponseEntity.ok(dtoList);
    }
}
