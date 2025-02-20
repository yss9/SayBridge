package com.backend.controller;


import com.backend.entity.Language;
import com.backend.repository.SubscriberRepository;
import com.backend.service.SubscriberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/subscribers")
public class SubscriberController {

    @Autowired
    private SubscriberService subscriberService;

    @PostMapping("/subscribe")
    public ResponseEntity<String> subscribe(@RequestParam String email, @RequestParam Language preferredLanguage) {
        subscriberService.subscribe(email, preferredLanguage);
        return ResponseEntity.ok("subscribed");
    }

}
