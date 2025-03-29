package com.backend.service;

import com.backend.dto.LoginRequest;
import com.backend.dto.UserProfileResponse;
import com.backend.dto.UserUpdateRequest;
import com.backend.entity.TeacherProfile;
import com.backend.entity.User;
import com.backend.repository.TeacherProfileRepository;
import com.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TeacherProfileRepository teacherProfileRepository;

    public UserProfileResponse getUserProfile(User user) {
        if (user == null) return null;

        TeacherProfile teacherProfile = teacherProfileRepository.findByUser(user).orElse(null);
        Long teacherProfileId = (teacherProfile != null) ? teacherProfile.getId() : null;

        return new UserProfileResponse(user.getId(),user.getEmail(), user.getUsername(), user.getNickname(), user.getProfileImageUrl(), user.getRole(),teacherProfileId);
    }


    public void updateUserProfile(User user, UserUpdateRequest updateData) {
        if (updateData.getUsername() != null) {
            user.setUsername(updateData.getUsername());
        }
        if (updateData.getNickname() != null) {
            user.setNickname(updateData.getNickname());
        }
        if (updateData.getImageUrl() != null) {
            user.setProfileImageUrl(updateData.getImageUrl());
        }

        if (updateData.getPassword() != null && updateData.getNewPassword() != null) {
            if (!passwordEncoder.matches(updateData.getPassword(), user.getPassword())) {
                throw new IllegalArgumentException("현재 비밀번호가 일치하지 않습니다.");
            }
            String encodedNewPassword = passwordEncoder.encode(updateData.getNewPassword());
            user.setPassword(encodedNewPassword);
        }

        userRepository.save(user);
    }

    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    public Map<String, Object> verifyPassword(User user, LoginRequest password) {
        Map<String, Object> results = new HashMap<>();
        if (!passwordEncoder.matches(password.getPassword(), user.getPassword())) {
            results.put("success", false);
            results.put("message", "비밀번호가 일치하지 않습니다.");
        }
        else  {
            results.put("success", true);
            results.put("message", "비밀번호가 일치합니다.");
        }
        return results;
    }
}
