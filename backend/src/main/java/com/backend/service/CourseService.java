package com.backend.service;

import com.backend.dto.CourseDto;
import com.backend.dto.CourseSearchResponse;
import com.backend.entity.*;
import com.backend.repository.CourseRepository;
import com.backend.repository.TeacherProfileRepository;
import com.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TeacherProfileRepository teacherProfileRepository;

    public List<CourseSearchResponse> findCourses(Language language, CourseLevel level) {
        return courseRepository.searchCourses(language, level);
    }

    public CourseDto findCourseById(Long id) {
        Course course = courseRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("유저를 찾을 수 없습니다."));
        CourseDto courseDto = new CourseDto(course);
        return courseDto;
    }

    public List<Course> findAllCourses() {
        return courseRepository.findAll();
    }

    public void createCourse(CourseDto courseDto, Authentication authentication) {

        String email = (String) authentication.getPrincipal();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("유저를 찾을 수 없습니다."));
        TeacherProfile teacherProfile = teacherProfileRepository.findByUser(user)
                .orElseThrow(() -> new UsernameNotFoundException("선생님 정보를 찾을 수 없습니다."));

        Course course = new Course();
        course.setTitle(courseDto.getTitle());
        course.setDescription(courseDto.getDescription());
        course.setLevel(courseDto.getLevel());
        course.setLanguage(courseDto.getLanguage());
        course.setMaxStudents(courseDto.getMaxStudents());
        course.setCurrentStudents(0);
        course.setTeacher(teacherProfile);
        courseRepository.save(course);
        emailService.sendNewCourseNotification(course);
    }

    public void updateCourse(Long courseId, CourseDto courseDto) {
        Course course = courseRepository.findById(courseId).orElseThrow(() -> new UsernameNotFoundException("강의를 찾을 수 없습니다."));
        if(courseDto.getTitle()!=null) {
            course.setTitle(courseDto.getTitle());
        }
        if(courseDto.getDescription()!=null) {
            course.setDescription(courseDto.getDescription());
        }
        if(courseDto.getLanguage()!=null) {
            course.setLanguage(courseDto.getLanguage());
        }
        if(courseDto.getLevel()!=null) {
            course.setLevel(courseDto.getLevel());
        }
        if(courseDto.getMaxStudents()!=null) {
            course.setMaxStudents(courseDto.getMaxStudents());
        }
        courseRepository.save(course);
    }


    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }

}
