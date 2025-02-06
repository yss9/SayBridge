package com.saybridge.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@Entity
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String username;

    private String nickname;

    private String password;

    private String profileImageUrl;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Enumerated(EnumType.STRING)
    private AuthProvider provider;

    private LocalDateTime lastLoginTime;

    private LocalDateTime createdAt;

    private String refreshToken;

    @PrePersist
    public void prePersist(){

        this.createdAt = LocalDateTime.now(ZoneId.of("Asia/Seoul"));

    }

}
