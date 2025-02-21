package com.backend.controller;

import com.backend.dto.CourseDto;
import com.backend.dto.CourseSearchResponse;
import com.backend.entity.Course;
import com.backend.entity.CourseLevel;
import com.backend.entity.Language;
import com.backend.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/{courseId}")
    public CourseDto getCourse(@PathVariable Long courseId) {
        return courseService.findCourseById(courseId);
    }

    @PostMapping("/create")
    public ResponseEntity<Void> createCourse(@RequestBody CourseDto course, Authentication authentication) {
        courseService.createCourse(course, authentication);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PatchMapping("/update/{courseId}")
    public ResponseEntity<Void> updateCourse(@PathVariable Long courseId, @RequestBody CourseDto course) {
        courseService.updateCourse(courseId,course);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete/{courseId}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long courseId) {
        courseService.deleteCourse(courseId);
        return ResponseEntity.ok().build();
    }

}
