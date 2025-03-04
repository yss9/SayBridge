package com.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserReviewDto {
    private Long id;
    private String courseTitle;
    private int rating;
    private String content;

}
