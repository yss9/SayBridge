package com.saybridge.service;

import com.saybridge.dto.LoginRequest;
import com.saybridge.dto.LoginResponse;
import com.saybridge.dto.RegisterRequest;
import com.saybridge.entity.AuthProvider;
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
        // 1) 이메일 중복 확인
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("이미 가입된 이메일입니다.");
        }

        // 2) 패스워드 암호화
        String encodedPassword = passwordEncoder.encode(request.getPassword());

        // 3) User 엔티티 생성 & 저장
        User user = new User();
        user.setEmail(request.getEmail());
        user.setUserName(request.getUserName());
        user.setPassword(encodedPassword);
        user.setNickname(request.getNickname());
        user.setProvider(AuthProvider.LOCAL); // 일반 회원가입

        userRepository.save(user);
    }

    public LoginResponse login(LoginRequest request) {
        // 1) email로 사용자 조회
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new NoSuchElementException("존재하지 않는 계정입니다."));

        // 2) 비밀번호 일치 확인
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        // 3) JWT 토큰 생성
        String token = tokenUtil.createToken(user.getEmail());

        // 4) Response DTO 반환
        return new LoginResponse(token);
    }

    public boolean existEmail(String email){
        return userRepository.existsByEmail(email);
    }

}
