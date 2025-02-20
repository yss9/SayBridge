package com.backend.service;

import com.backend.dto.UserProfileResponse;
import com.backend.dto.UserUpdateRequest;
import com.backend.entity.User;
import com.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserProfileResponse getUserProfile(Authentication authentication) {

        User user = getUser(authentication);
        if (user == null) return null;

        UserProfileResponse profile = new UserProfileResponse(user.getEmail(), user.getUsername(), user.getNickname(), user.getProfileImageUrl());
        return profile;
    }


    public void updateUserProfile(Authentication authentication, UserUpdateRequest updateData) {
        System.out.println("updateData = " + updateData.getUsername());

        User user = getUser(authentication);

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

    public void deleteUser(Authentication authentication) {
        User user = getUser(authentication);
        userRepository.delete(user);
    }


    private User getUser(Authentication authentication) {
        if (authentication == null) {
            return null;
        }
        String email = (String) authentication.getPrincipal();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));
        return user;
    }

}
