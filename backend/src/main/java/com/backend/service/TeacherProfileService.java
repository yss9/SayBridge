package com.backend.service;

import com.backend.dto.TeacherProfileDto;
import com.backend.entity.TeacherProfile;
import com.backend.entity.User;
import com.backend.repository.TeacherProfileRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TeacherProfileService {

    @Autowired
    private TeacherProfileRepository teacherProfileRepository;

    public TeacherProfileDto findTeacherProfileById(Long id) {
        TeacherProfile teacherProfile = teacherProfileRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("TeacherProfile with id " + id + " not found"));
        return new TeacherProfileDto(teacherProfile);
    }

    public void updateTeacherProfile(TeacherProfileDto updateData, User user) {
        TeacherProfile teacherProfile = teacherProfileRepository.findByUser(user).orElseThrow(() -> new EntityNotFoundException("TeacherProfile with id " + user.getId() + " not found"));
        if(updateData.getDescription()!=null){
            teacherProfile.setDescription(updateData.getDescription());
        }
        if(updateData.getTag()!=null){
            teacherProfile.setTag(updateData.getTag());
        }
        if(updateData.getLanguage()!=null){
            teacherProfile.setLanguage(updateData.getLanguage());
        }
        if(updateData.getImageUrl()!=null){
            teacherProfile.setImageUrl(updateData.getImageUrl());
        }
        teacherProfileRepository.save(teacherProfile);

    }
}
