package com.saybridge.controller;

import com.saybridge.dto.LoginRequest;
import com.saybridge.dto.LoginResponse;
import com.saybridge.dto.RegisterRequest;
import com.saybridge.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;


    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody RegisterRequest request) {
        authService.signup(request);
        return ResponseEntity.ok("회원가입 성공");
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/email-exists")
    public ResponseEntity<Boolean> emailExists(@RequestParam String email) {
        boolean existEmail = authService.existEmail(email);
        return ResponseEntity.ok(existEmail);
    }

}
