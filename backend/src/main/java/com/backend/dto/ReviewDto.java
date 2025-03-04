package com.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewDto {

    private Long courseId;
    private String content;
    private int rating;

}
