package com.backend.service;

import com.backend.dto.CourseDto;
import com.backend.dto.CourseSearchResponse;
import com.backend.entity.*;
import com.backend.event.CourseCreatedEvent;
import com.backend.repository.CourseRepository;
import com.backend.repository.CourseEnrollmentRepository;
import com.backend.repository.TeacherProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private TeacherProfileRepository teacherProfileRepository;

    @Autowired
    private CourseEnrollmentRepository courseEnrollmentRepository;

    @Autowired
    private ApplicationEventPublisher eventPublisher;

    public List<CourseSearchResponse> findCourses(Language language, CourseLevel level, int page, int size) {
        return courseRepository.searchCourses(language, level, page, size);
    }

    public CourseDto findCourseById(Long id) {
        Course course = courseRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("유저를 찾을 수 없습니다."));
        CourseDto courseDto = new CourseDto(course);
        return courseDto;
    }

    public List<CourseDto> findAllCourses() {
        return courseRepository.findAll()
                .stream()
                .map(CourseDto::new)  // Course -> CourseDto 변환
                .collect(Collectors.toList());
    }

    public Page<CourseDto> getCourses(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        return courseRepository.findAll(pageable).map(CourseDto::new);
    }


    public void createCourse(CourseDto courseDto, User user) {
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

        CourseCreatedEvent event = new CourseCreatedEvent(course);
        eventPublisher.publishEvent(event);
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

    public List<CourseDto> findCoursesByStudentId(User user) {
        List<CourseEnrollment> courseEnrollments = courseEnrollmentRepository.findByStudentId(user.getId());

        return courseEnrollments.stream()
                .map(courseEnrollment -> new CourseDto(courseEnrollment.getCourse()))
                .collect(Collectors.toList());
    }

    public List<CourseDto> findCoursesByTeacher(Long teacherId) {
        return courseRepository.findAllByTeacherId(teacherId).stream()
                .map(CourseDto::new)
                .collect(Collectors.toList());

    }



}
