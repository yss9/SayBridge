package com.backend.service;

import com.backend.dto.CoursePostDto;
import com.backend.entity.Course;
import com.backend.entity.CoursePost;
import com.backend.repository.CoursePostRepository;
import com.backend.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CoursePostService {

    @Autowired
    private CoursePostRepository coursePostRepository;

    @Autowired
    private CourseRepository courseRepository;

    public List<CoursePostDto> findCoursePostsByCourseId(Long courseId) {
        Course course = courseRepository.findById(courseId).orElseThrow(() -> new UsernameNotFoundException("Course not found"));
        List<CoursePost> coursePostsByCourseId = coursePostRepository.findCoursePostsByCourseId(course);
        List<CoursePostDto> coursePostDtos = new ArrayList<>();
        for (CoursePost coursePost : coursePostsByCourseId) {
            coursePostDtos.add(new CoursePostDto(coursePost));
        }
        return coursePostDtos;
    }

    public Long coursePostsAdd(CoursePostDto coursePostDto) {
        CoursePost coursePost = new CoursePost();
        Course course = courseRepository.findById(coursePostDto.getCourseId()).orElseThrow(()->new UsernameNotFoundException("해당 강좌를 찾을 수 없습니다."));
        coursePost.setCourseId(course);
        coursePost.setTitle(coursePostDto.getTitle());
        coursePost.setContent(coursePostDto.getContent());
        coursePost.setAttachmentUrl(coursePostDto.getAttachmentUrl());
        CoursePost saved = coursePostRepository.save(coursePost);
        return saved.getId();
    }

    public void coursePostsUpdate(Long postId, CoursePostDto coursePostDto) {
        CoursePost coursePost = coursePostRepository.findById(postId).orElseThrow(()->new UsernameNotFoundException("해당 강좌를 찾을 수 없습니다."));
        if (coursePostDto.getTitle() != null) {
            coursePost.setTitle(coursePostDto.getTitle());
        }
        if (coursePostDto.getContent() != null) {
            coursePost.setContent(coursePostDto.getContent());
        }
        if (coursePostDto.getAttachmentUrl() != null) {
            coursePost.setAttachmentUrl(coursePostDto.getAttachmentUrl());
        }
        coursePostRepository.save(coursePost);
    }

    public void coursePostsDelete(Long id) {
        coursePostRepository.deleteById(id);
    }


}
