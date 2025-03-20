package com.backend.controller;

import com.backend.entity.User;
import com.backend.service.AuthService;
import com.backend.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/files")
public class FileController {

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private AuthService authService;

    @PostMapping("/profile")
    public ResponseEntity<String> updateUserProfile(Authentication authentication,
                                                    @RequestPart("file") MultipartFile multipartFile) throws IOException {
        User currentUser = authService.getCurrentUser(authentication);
        String fileUrl = fileStorageService.uploadUserProfile(currentUser, multipartFile);
        return ResponseEntity.ok(fileUrl);
    }

    @PostMapping("/teacher/profile")
    public ResponseEntity<String> updateTeacherProfile(Authentication authentication,
                                                       @RequestPart("file") MultipartFile multipartFile) throws IOException {
        User currentUser = authService.getCurrentUser(authentication);
        String fileUrl = fileStorageService.uploadTeacherProfile(currentUser, multipartFile);
        return ResponseEntity.ok(fileUrl);
    }

    @PostMapping("/coursePost/{coursePostId}")
    public ResponseEntity<String> uploadCoursePostFile(@PathVariable Long coursePostId,
                                                       @RequestPart("file") MultipartFile multipartFile) throws IOException {
        String fileUrl = fileStorageService.uploadCoursePostFile(coursePostId, multipartFile);
        return ResponseEntity.ok(fileUrl);
    }

    @PostMapping("/homework/{coursePostId}")
    public ResponseEntity<String> uploadHomeworkFile(@PathVariable Long coursePostId,
                                                     Authentication authentication,
                                                     @RequestPart("file") MultipartFile multipartFile) throws IOException {
        User currentUser = authService.getCurrentUser(authentication);
        String fileUrl = fileStorageService.uploadHomeworkFile(coursePostId, currentUser, multipartFile);
        return ResponseEntity.ok(fileUrl);
    }
}
