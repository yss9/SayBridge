package com.backend.dto;

import com.backend.entity.CoursePost;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CoursePostDto {

    private Long courseId;
    private String title;
    private String content;
    private String attachmentUrl;
    private LocalDateTime created;

    public CoursePostDto(CoursePost coursePost) {
        this.title = coursePost.getTitle();
        this.content = coursePost.getContent();
        this.attachmentUrl = coursePost.getAttachmentUrl();
        this.created = coursePost.getCreatedAt();
    }

}
