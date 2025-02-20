package com.backend.service;


import com.backend.entity.Language;
import com.backend.entity.Subscriber;
import com.backend.repository.SubscriberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

@Service
public class SubscriberService {

    @Autowired
    private SubscriberRepository subscriberRepository;

    public Subscriber subscribe(String email, Language preferredLanguage) {
        if (subscriberRepository.existsByEmailAndPreferredLanguage(email,preferredLanguage) ) {
            throw new DataIntegrityViolationException("이미 구독 중인 이메일입니다.");
        }
        Subscriber subscriber = new Subscriber();
        subscriber.setEmail(email);
        subscriber.setPreferredLanguage(preferredLanguage);
        subscriberRepository.save(subscriber);
        return subscriber;
    }

}
