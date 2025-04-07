package com.backend.service;

import com.backend.dto.ChatMessageDto;
import com.backend.entity.ChatMessage;
import com.backend.entity.ChatRoom;
import com.backend.entity.User;
import com.backend.repository.ChatMessageRepository;
import com.backend.repository.ChatRoomRepository;
import com.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ChatServiceImpl implements ChatService {

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    @Autowired
    private ChatRoomRepository chatRoomRepository;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;


    @Override
    public ChatMessageDto processAndSaveMessage(ChatMessageDto chatMessageDto, User user) {
        ChatRoom chatRoom = chatRoomRepository.findByChatCode(chatMessageDto.getChatCode())
                .orElseThrow(() -> new RuntimeException("채팅방을 찾을 수 없습니다."));

        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setChatRoom(chatRoom);
        chatMessage.setSender(user);
        chatMessage.setMessage(chatMessageDto.getMessage());
        chatMessage.setCreatedAt(LocalDateTime.now());

        ChatMessage savedMessage = chatMessageRepository.save(chatMessage);

        String redisKey = "chatroom:" + chatRoom.getChatCode() + ":messages";
        redisTemplate.opsForList().rightPush(redisKey, savedMessage.getId());

        ChatMessageDto responseDto = new ChatMessageDto();
        responseDto.setId(savedMessage.getId());
        responseDto.setChatCode(chatRoom.getChatCode());
        responseDto.setSenderEmail(user.getEmail());
        responseDto.setSenderName(user.getUsername());
        responseDto.setMessage(savedMessage.getMessage());
        responseDto.setCreatedAt(savedMessage.getCreatedAt());

        return responseDto;
    }
}
