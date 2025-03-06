package com.backend.controller;

import com.backend.dto.TeacherProfileDto;
import com.backend.entity.TeacherProfile;
import com.backend.service.TeacherProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/teacher")
public class TeacherController {

    @Autowired
    private TeacherProfileService teacherProfileService;

    @GetMapping("/{teacherId}")
    public ResponseEntity<TeacherProfileDto> getTeacherProfile(@PathVariable Long teacherId) {
        TeacherProfileDto teacherProfileById = teacherProfileService.findTeacherProfileById(teacherId);
        return ResponseEntity.ok(teacherProfileById);
    }



}
