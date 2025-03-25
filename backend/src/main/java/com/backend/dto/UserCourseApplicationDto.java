package com.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class UserCourseApplicationDto {
    private Long id;
    private Long courseId;
    private String courseName;
    private String teacherName;
    private LocalDateTime appliedAt;
}
