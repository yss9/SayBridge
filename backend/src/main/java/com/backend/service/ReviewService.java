package com.backend.service;


import com.backend.dto.CourseReviewDto;
import com.backend.dto.ReviewDto;
import com.backend.dto.UserReviewDto;
import com.backend.entity.Course;
import com.backend.entity.Review;
import com.backend.entity.User;
import com.backend.repository.CourseRepository;
import com.backend.repository.ReviewRepository;
import com.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private CourseRepository courseRepository;

    public List<UserReviewDto> getReviewByUser(User user) {
        List<Review> reviews = reviewRepository.findAllByUserId(user.getId());
        return reviews.stream()
                .map(review -> {
                    UserReviewDto dto = new UserReviewDto();
                    dto.setId(review.getId());
                    dto.setCourseId(review.getCourse().getId());
                    dto.setCourseTitle(review.getCourse().getTitle());
                    dto.setRating(review.getRating());
                    dto.setContent(review.getContent());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    public List<CourseReviewDto> getReviewByCourseId(Long courseId) {
        List<Review> reviews = reviewRepository.findAllByCourseId(courseId);
        return reviews.stream()
                .map(review -> {
                    CourseReviewDto dto = new CourseReviewDto();
                    dto.setNickname(review.getUser().getNickname());
                    dto.setRating(review.getRating());
                    dto.setContent(review.getContent());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    public void insertReview(User user, ReviewDto reviewDto) {
        Review review = new Review();
        Course course = courseRepository.findById(reviewDto.getCourseId()).orElseThrow();
        review.setUser(user);
        review.setRating(reviewDto.getRating());
        review.setContent(reviewDto.getContent());
        review.setCourse(course);
        reviewRepository.save(review);
    }

    public void deleteReview(Long reviewId) {
        reviewRepository.deleteById(reviewId);
    }

    public List<UserReviewDto> getReviewByTeacherId(Long teacherId) {
        List<Review> byCourseTeacherId = reviewRepository.findByCourseTeacherId(teacherId);
        return byCourseTeacherId.stream()
                .map(review -> {
                    UserReviewDto dto = new UserReviewDto();
                    dto.setId(review.getId());
                    dto.setUserNickname(review.getUser().getNickname());
                    dto.setCourseId(review.getCourse().getId());
                    dto.setCourseTitle(review.getCourse().getTitle());
                    dto.setRating(review.getRating());
                    dto.setContent(review.getContent());
                    return dto;
                })
                .collect(Collectors.toList());
    }
}
