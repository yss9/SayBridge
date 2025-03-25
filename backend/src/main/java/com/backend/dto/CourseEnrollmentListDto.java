package com.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CourseEnrollmentListDto {

    private Long id;
    private String studentName;
    private LocalDateTime joinedAt;

}
