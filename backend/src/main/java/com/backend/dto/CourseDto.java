package com.backend.dto;


import com.backend.entity.Course;
import com.backend.entity.CourseLevel;
import com.backend.entity.Language;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CourseDto {

    private Long id;
    private String teacherId;
    private String title;
    private String description;
    private Integer maxStudents;
    private Language language;
    private CourseLevel level;

}
