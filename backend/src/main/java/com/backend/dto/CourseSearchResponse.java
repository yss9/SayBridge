package com.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CourseSearchResponse {

    private Long id;
    private Long teacherId;
    private String teacherName;
    private String title;
    private String level;
    private String language;
    private String description;
    private Integer maxStudents;
    private Integer currentStudents;

}
