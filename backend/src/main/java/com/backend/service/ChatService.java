package com.backend.service;

import com.backend.dto.ChatMessageDto;
import com.backend.entity.User;

public interface ChatService {
    ChatMessageDto processAndSaveMessage(ChatMessageDto chatMessageDto, User user);
}