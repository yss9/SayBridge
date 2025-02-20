package com.backend.service;

import com.backend.repository.CoursePostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CoursePostService {

    @Autowired
    private CoursePostRepository coursePostRepository;



}
