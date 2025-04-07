package com.backend.controller;

import com.backend.entity.ChatRoom;
import com.backend.service.ChatRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chatrooms")
public class ChatRoomController {

    @Autowired
    private ChatRoomService chatRoomService;

    @PostMapping
    public ChatRoom createChatRoom(@RequestParam Integer maxParticipants) {
        return chatRoomService.createChatRoom(maxParticipants);
    }
}
