package com.saybridge.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApiTestController {

    @GetMapping("/test")
    public String Test(){
        return "good";
    }


    @GetMapping("/oauth2/success")
    public String success() {
        return "OAuth2 login successful!";
    }

}
