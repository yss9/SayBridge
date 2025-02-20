package com.backend.controller;

import com.backend.dto.CourseDto;
import com.backend.dto.CourseSearchResponse;
import com.backend.entity.Course;
import com.backend.entity.CourseLevel;
import com.backend.entity.Language;
import com.backend.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/course")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @GetMapping("/search")
    public List<CourseSearchResponse> findCourses(@RequestParam(required = false) Language language,
                                                  @RequestParam(required = false) CourseLevel level) {
        return courseService.findCourses(language, level);
    }

    @GetMapping("/list")
    public List<Course> findAllCourses(){
        return courseService.findAllCourses();
    }

    @PostMapping("/create")
    public void createCourse(@RequestBody CourseDto course, Authentication authentication) {
        courseService.createCourse(course, authentication);
    }

    @PatchMapping("/update")
    public void updateCourse(@RequestBody CourseDto course) {
        courseService.updateCourse(course);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
    }

}
