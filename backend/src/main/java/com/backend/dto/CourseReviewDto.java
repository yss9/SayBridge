package com.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CourseReviewDto {

    private String nickname;
    private int rating;
    private String content;

}
