package com.backend.controller;

import com.backend.dto.CourseDto;
import com.backend.dto.CourseSearchResponse;
import com.backend.entity.Course;
import com.backend.entity.CourseLevel;
import com.backend.entity.Language;
import com.backend.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/course")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @GetMapping("/search")
    public List<CourseSearchResponse> findCourses(
            @RequestParam(required = false) @Nullable Language language,
            @RequestParam(required = false) @Nullable CourseLevel level,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size) {
        return courseService.findCourses(language, level, page, size);
    }

    @GetMapping("/list")
    public List<CourseDto> findAllCourses(){
        return courseService.findAllCourses();
    }

    @GetMapping("/{courseId}")
    public CourseDto getCourse(@PathVariable Long courseId) {
        return courseService.findCourseById(courseId);
    }

    @GetMapping
    public Page<CourseDto> getCourses(@RequestParam(defaultValue = "0") int page,
                                      @RequestParam(defaultValue = "9") int size){
        return courseService.getCourses(page, size);
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
