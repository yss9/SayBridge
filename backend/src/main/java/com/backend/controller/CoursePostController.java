package com.backend.controller;

import com.backend.dto.CoursePostDto;
import com.backend.service.CoursePostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/post")
public class CoursePostController {

    @Autowired
    private CoursePostService coursePostService;

    @GetMapping("/{courseId}")
    public List<CoursePostDto> getCoursePosts(@PathVariable Long courseId) {
        return coursePostService.findCoursePostsByCourseId(courseId);
    }

    @PostMapping("/create")
    public ResponseEntity<Long> createCoursePost(@RequestBody CoursePostDto coursePostDto) {
        Long coursePostId = coursePostService.coursePostsAdd(coursePostDto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(coursePostId);
    }

    @PatchMapping("/update/{coursePostId}")
    public ResponseEntity<Void> updateCoursePost(@PathVariable Long coursePostId,@RequestBody CoursePostDto coursePostDto) {
        coursePostService.coursePostsUpdate(coursePostId, coursePostDto);
        return ResponseEntity
                .status(HttpStatus.OK)
                .build();
    }

    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<Void> deleteCoursePost(@PathVariable Long postId) {
        coursePostService.coursePostsDelete(postId);
        return ResponseEntity.
                status(HttpStatus.OK)
                .build();
    }

}
