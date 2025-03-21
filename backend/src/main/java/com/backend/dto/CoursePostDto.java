package com.backend.dto;

import com.backend.entity.CoursePost;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class CoursePostDto {

    private Long courseId;
    private Long postId;
    private String title;
    private String content;
    private String attachmentUrl;
    private LocalDateTime created;

    public CoursePostDto(CoursePost coursePost) {
        this.postId = coursePost.getId();
        this.title = coursePost.getTitle();
        this.content = coursePost.getContent();
        this.attachmentUrl = coursePost.getAttachmentUrl();
        this.created = coursePost.getCreatedAt();
    }

}
