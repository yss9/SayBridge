package com.backend.dto;

import com.backend.entity.AuthProvider;
import com.backend.entity.Role;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AdminUserDto {
    private Long id;
    private String email;
    private String username;
    private String nickname;
    private String profileImageUrl;
    private Role role;
    private AuthProvider provider;
    private LocalDateTime createdAt;
}
