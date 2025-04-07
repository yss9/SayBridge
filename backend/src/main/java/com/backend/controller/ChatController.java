package com.backend.controller;

import com.backend.dto.ChatMessageDto;
import com.backend.entity.User;
import com.backend.service.AuthService;
import com.backend.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private AuthService authService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat.sendMessage")
    public void sendMessage(ChatMessageDto chatMessageDto, Authentication authentication) {
        User currentUser = authService.getCurrentUser(authentication);
        ChatMessageDto savedMessage = chatService.processAndSaveMessage(chatMessageDto, currentUser);
        messagingTemplate.convertAndSend("/topic/chatroom/" + savedMessage.getChatCode(), savedMessage);
    }
}
