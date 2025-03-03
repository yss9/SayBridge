package com.backend.controller;

import com.backend.dto.LoginRequest;
import com.backend.dto.UserProfileResponse;
import com.backend.dto.UserUpdateRequest;
import com.backend.entity.User;
import com.backend.service.AuthService;
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

    @Autowired
    private AuthService authService;

    @GetMapping("/me")
    public ResponseEntity<UserProfileResponse> getMyUserProfile(Authentication authentication) {
        User currentUser = authService.getCurrentUser(authentication);
        UserProfileResponse userProfile = userService.getUserProfile(currentUser);
        return ResponseEntity.ok(userProfile);
    }

    @PatchMapping("/update")
    public ResponseEntity<Void> updateCourse(Authentication authentication, @RequestBody UserUpdateRequest userUpdateRequest) {
        User currentUser = authService.getCurrentUser(authentication);
        userService.updateUserProfile(currentUser, userUpdateRequest);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteCourse(Authentication authentication) {
        User currentUser = authService.getCurrentUser(authentication);
        userService.deleteUser(currentUser);
        return ResponseEntity.ok().build();
    }


}
