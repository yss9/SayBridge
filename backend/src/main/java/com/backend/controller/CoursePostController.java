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

    @GetMapping("/{postId}")
    public List<CoursePostDto> getCoursePosts(@PathVariable Long postId) {
        return coursePostService.findCoursePostsByCourseId(postId);
    }

    @PostMapping("/create")
    public ResponseEntity<Void> createCoursePost(@RequestBody CoursePostDto coursePostDto) {
        coursePostService.coursePostsAdd(coursePostDto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .build();
    }

    @PatchMapping("/update/{postId}")
    public ResponseEntity<Void> updateCoursePost(@PathVariable Long postId,@RequestBody CoursePostDto coursePostDto) {
        coursePostService.coursePostsUpdate(postId, coursePostDto);
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
