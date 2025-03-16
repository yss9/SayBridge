package com.backend.controller;

import com.backend.dto.TeacherProfileDto;
import com.backend.entity.TeacherProfile;
import com.backend.entity.User;
import com.backend.service.AuthService;
import com.backend.service.TeacherProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/teacher")
public class TeacherController {

    @Autowired
    private TeacherProfileService teacherProfileService;

    @Autowired
    private AuthService authService;

    @GetMapping("/{teacherId}")
    public ResponseEntity<TeacherProfileDto> getTeacherProfile(@PathVariable Long teacherId) {
        TeacherProfileDto teacherProfileById = teacherProfileService.findTeacherProfileById(teacherId);
        return ResponseEntity.ok(teacherProfileById);
    }

    @PatchMapping("/update")
    public ResponseEntity<Void> updateTeacherProfile(@RequestBody TeacherProfileDto teacherProfileDto, Authentication authentication) {
        User currentUser = authService.getCurrentUser(authentication);
        teacherProfileService.updateTeacherProfile(teacherProfileDto, currentUser);
        return ResponseEntity.ok().build();
    }


}
