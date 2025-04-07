package com.backend.service;

import com.backend.entity.ChatRoom;
import com.backend.repository.ChatRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatRoomService {

    @Autowired
    private ChatRoomRepository chatRoomRepository;

    public ChatRoom createChatRoom(Integer maxParticipants) {
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setMaxParticipants(maxParticipants);
        return chatRoomRepository.save(chatRoom);
    }

}
