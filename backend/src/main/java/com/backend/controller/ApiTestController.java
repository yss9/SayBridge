package com.backend.controller;

import com.backend.dto.RedisDto;
import com.backend.service.RedisService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/test")
public class ApiTestController {

    @Autowired
    private RedisService redisService;

    @GetMapping("/test")
    public String Test(){
        return "good";
    }


    @GetMapping("/oauth2/success")
    public String success() {
        return "OAuth2 login successful!";
    }

    @PostMapping("/redis/set")
    public void set(@RequestBody RedisDto redisDto) {
        redisService.setValue(redisDto.getKey(), redisDto.getValue());
    }

    @GetMapping("/redis/get")
    public String get(@RequestParam String key){
        return (String) redisService.getValue(key);
    }


}
