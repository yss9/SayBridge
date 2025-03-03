package com.backend.event;

import com.backend.entity.Course;

public class CourseCreatedEvent {
    private final Course course;

    public CourseCreatedEvent(Course course) {
        this.course = course;
    }

    public Course getCourse() {
        return course;
    }
}