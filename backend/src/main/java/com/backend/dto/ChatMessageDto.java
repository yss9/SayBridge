package com.backend.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ChatMessageDto {
    private Long id;
    private String chatCode;
    private String senderName;
    private String senderEmail;
    private String message;
    private LocalDateTime createdAt;
}
