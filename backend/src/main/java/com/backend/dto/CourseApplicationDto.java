package com.backend.dto;

import com.backend.entity.Course;
import com.backend.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CourseApplicationDto {

    private Long id;
    private User student;
    private Course course;
    private LocalDateTime appliedAt;

}
