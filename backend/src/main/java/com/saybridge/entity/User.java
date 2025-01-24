package com.saybridge.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // SNS 제공자 (일반 가입자는 null 가능)
    @Column(nullable = true)
    private String provider;

    // SNS 제공자가 제공하는 고유 ID (일반 가입자는 null 가능)
    @Column(nullable = true, unique = true)
    private String providerId;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, length = 50)
    private String userName;

    @Column(length = 50)
    private String nickName;

    @Column(length = 255)
    private String profileImageUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private String birthDate;

    @Column(nullable = true)
    private LocalDateTime lastLoginTime;

    @Column(length = 20)
    private Role role;

    @Column(nullable = false)
    private String country;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

}
