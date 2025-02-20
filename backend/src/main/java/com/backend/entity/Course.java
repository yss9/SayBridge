package com.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "teacher_id", nullable = false)
    private TeacherProfile teacher;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(nullable = false, length = 50)
    @Enumerated(EnumType.STRING)
    private CourseLevel level;

    @Column(nullable = false, length = 50)
    @Enumerated(EnumType.STRING)
    private Language language;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false)
    private Integer maxStudents;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private Integer currentStudents = 0;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }


}
