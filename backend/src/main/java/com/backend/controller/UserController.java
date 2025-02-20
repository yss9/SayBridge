package com.backend.controller;

import com.backend.dto.CourseDto;
import com.backend.dto.UserProfileResponse;
import com.backend.dto.UserUpdateRequest;
import com.backend.entity.User;
import com.backend.repository.UserRepository;
import com.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        UserProfileResponse userProfile = userService.getUserProfile(authentication);
        return ResponseEntity.ok(userProfile);
    }

    @PatchMapping("/update")
    public ResponseEntity<?> updateCourse(Authentication authentication, @RequestBody UserUpdateRequest userUpdateRequest) {
        userService.updateUserProfile(authentication, userUpdateRequest);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteCourse(Authentication authentication) {
        userService.deleteUser(authentication);
        return ResponseEntity.ok().build();
    }


}
