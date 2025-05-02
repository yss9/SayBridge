package com.backend.service;

import com.backend.dto.AdminUserDto;
import com.backend.dto.RoleUpdateDto;
import com.backend.entity.Language;
import com.backend.entity.TeacherProfile;
import com.backend.entity.User;
import com.backend.repository.TeacherProfileRepository;
import com.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class AdminUserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TeacherProfileRepository teacherProfileRepository;

    @Value("${basic.image}")
    private String basicImage;

    public List<AdminUserDto> findAll() {
        return userRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public AdminUserDto findById(Long id) {
        return toDto(userRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("User not found: " + id)));
    }

    @Transactional
    public AdminUserDto updateRole(Long id, RoleUpdateDto dto) {
        User u = userRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("User not found: " + id));

        u.setRole(dto.getRole());
        userRepository.save(u);

        boolean exists = teacherProfileRepository.findByUser(u).isPresent();

        if (dto.getRole().name().equals("TEACHER")) {
            if (!exists) {
                TeacherProfile profile = new TeacherProfile();
                profile.setUser(u);
                profile.setLanguage(Language.ENGLISH);
                profile.setImageUrl(basicImage);
                teacherProfileRepository.save(profile);
            }
        }

        else if (dto.getRole().name().equals("USER")) {
            if (exists) {
                teacherProfileRepository.deleteById(u.getId());
            }
        }

        return toDto(u);
    }


    public void delete(Long id) {
        if (!userRepository.existsById(id)) {
            throw new NoSuchElementException("User not found: " + id);
        }
        userRepository.deleteById(id);
    }

    private AdminUserDto toDto(User u) {
        AdminUserDto dto = new AdminUserDto();
        dto.setId(u.getId());
        dto.setEmail(u.getEmail());
        dto.setUsername(u.getUsername());
        dto.setNickname(u.getNickname());
        dto.setProfileImageUrl(u.getProfileImageUrl());
        dto.setRole(u.getRole());
        dto.setProvider(u.getProvider());
        dto.setCreatedAt(u.getCreatedAt());
        return dto;
    }
}
