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
    private Long courseId;
    private String studentName;
    private LocalDateTime appliedAt;

}
