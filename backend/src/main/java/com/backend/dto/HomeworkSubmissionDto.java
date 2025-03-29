package com.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class HomeworkSubmissionDto {

    private Long submissionId;
    private String studentName;
    private LocalDateTime submittedAt;
    private String fileUrl;

}
