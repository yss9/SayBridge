package com.backend.controller;

import com.backend.repository.CoursePostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/post")
public class CoursePostController {

    @Autowired
    private CoursePostRepository coursePostRepository;

}
