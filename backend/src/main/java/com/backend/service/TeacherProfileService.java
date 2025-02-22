package com.backend.service;

import com.backend.dto.TeacherProfileDto;
import com.backend.entity.TeacherProfile;
import com.backend.repository.TeacherProfileRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TeacherProfileService {

    @Autowired
    private TeacherProfileRepository teacherProfileRepository;

    public TeacherProfileDto findTeacherProfileById(Long id) {
        TeacherProfile teacherProfile = teacherProfileRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("TeacherProfile with id " + id + " not found"));
        return new TeacherProfileDto(teacherProfile);
    }
}
