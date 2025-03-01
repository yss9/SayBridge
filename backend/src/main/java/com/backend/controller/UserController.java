package com.backend.controller;

import com.backend.dto.LoginRequest;
import com.backend.dto.UserProfileResponse;
import com.backend.dto.UserUpdateRequest;
import com.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserProfileResponse> getCurrentUser(Authentication authentication) {
        UserProfileResponse userProfile = userService.getUserProfile(authentication);
        return ResponseEntity.ok(userProfile);
    }

    @PatchMapping("/update")
    public ResponseEntity<Void> updateCourse(Authentication authentication, @RequestBody UserUpdateRequest userUpdateRequest) {
        userService.updateUserProfile(authentication, userUpdateRequest);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteCourse(Authentication authentication) {
        userService.deleteUser(authentication);
        return ResponseEntity.ok().build();
    }


}
