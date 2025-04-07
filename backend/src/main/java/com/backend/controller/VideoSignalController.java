package com.backend.controller;

import com.backend.dto.VideoSignalDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class VideoSignalController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/video.signal")
    public void handleVideoSignal(VideoSignalDto videoSignalDto) {
        messagingTemplate.convertAndSend("/topic/video/" + videoSignalDto.getChatCode(), videoSignalDto);
    }
}
