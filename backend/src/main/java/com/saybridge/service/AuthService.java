package com.saybridge.service;

import com.saybridge.dto.LoginRequest;
import com.saybridge.dto.LoginResponse;
import com.saybridge.dto.RegisterRequest;
import com.saybridge.entity.AuthProvider;
import com.saybridge.entity.Role;
import com.saybridge.entity.User;
import com.saybridge.repository.UserRepository;
import com.saybridge.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenUtil tokenUtil;

    public void signup(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("이미 가입된 이메일입니다.");
        }

        String encodedPassword = passwordEncoder.encode(request.getPassword());

        User user = new User();
        user.setEmail(request.getEmail());
        user.setUsername(request.getUsername());
        user.setPassword(encodedPassword);
        user.setNickname(request.getNickname());
        user.setProvider(AuthProvider.LOCAL);
        user.setRole(Role.USER);

        userRepository.save(user);
    }

    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new NoSuchElementException("존재하지 않는 계정입니다."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }
        else{
            String token = tokenUtil.createToken(user.getEmail());
            return new LoginResponse(token);
        }
    }

    public boolean existEmail(String email){
        return userRepository.existsByEmail(email);
    }

}
