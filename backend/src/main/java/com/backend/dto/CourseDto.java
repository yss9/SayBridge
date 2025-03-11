package com.backend.dto;


import com.backend.entity.Course;
import com.backend.entity.CourseLevel;
import com.backend.entity.Language;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CourseDto {

    private Long id;
    private Long teacherId;
    private String teacherName;
    private String title;
    private String description;
    private Integer maxStudents;
    private Language language;
    private CourseLevel level;


    public CourseDto(Course course) {
        this.id = course.getId();
        this.teacherId = course.getTeacher().getId();
        this.teacherName = course.getTeacher().getUser().getUsername();
        this.title = course.getTitle();
        this.description = course.getDescription();
        this.maxStudents = course.getMaxStudents();
        this.level = course.getLevel();
        this.language = course.getLanguage();
    }


}
