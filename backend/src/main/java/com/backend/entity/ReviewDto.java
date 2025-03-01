package com.backend.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ReviewDto {

    private Long id;
    private Long userId;
    private Long courseId;
    private String content;
    private int rating;

}
