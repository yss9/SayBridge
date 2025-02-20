package com.backend.service;


import com.backend.entity.Course;
import com.backend.entity.Subscriber;
import com.backend.repository.SubscriberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private SubscriberRepository subscriberRepository;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public void sendNewCourseNotification(Course course) {
        List<Subscriber> subscribers = subscriberRepository.findAll();

        for (Subscriber subscriber : subscribers) {
            sendEmail(subscriber.getEmail(), course);
        }
    }

    private void sendEmail(String toEmail, Course course) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(toEmail);
        message.setSubject("SayBridge에서 새로운 강좌가 등록되었습니다! ");
        message.setText("안녕하세요!\n\n SayBridge에 신규 강좌가 등록되었습니다: "+
                "\n강의명: " + course.getTitle() +
                "\n설명: " + course.getDescription() +
                "\n언어: " + course.getLanguage() +
                "\n레벨: " + course.getLevel() +
                "\n\n수강을 원하시면 사이트를 방문해 주세요!");

        mailSender.send(message);
    }

}
