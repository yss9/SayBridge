package com.backend.controller;

import com.backend.dto.CourseReviewDto;
import com.backend.dto.ReviewDto;
import com.backend.dto.UserReviewDto;
import com.backend.entity.Review;
import com.backend.entity.User;
import com.backend.service.AuthService;
import com.backend.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/review")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private AuthService authService;

    @GetMapping("/my-reviews")
    public ResponseEntity<List<UserReviewDto>> getReviewByUserId(Authentication authentication) {
        User currentUser = authService.getCurrentUser(authentication);
        return ResponseEntity.ok(reviewService.getReviewByUser(currentUser));
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<CourseReviewDto>> getReviewByCourseId(@PathVariable Long courseId) {
        return ResponseEntity.ok(reviewService.getReviewByCourseId(courseId));
    }

    @PostMapping("/create")
    public ResponseEntity<Void> createReview(Authentication authentication, @RequestBody ReviewDto reviewDto) {
        User currentUser = authService.getCurrentUser(authentication);
        reviewService.insertReview(currentUser, reviewDto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .build();
    }

    @DeleteMapping("/delete/{reviewId}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long reviewId) {
        reviewService.deleteReview(reviewId);
        return ResponseEntity.noContent().build();
    }

}
