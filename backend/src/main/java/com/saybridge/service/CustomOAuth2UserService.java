package com.saybridge.service;

import com.saybridge.entity.AuthProvider;
import com.saybridge.entity.Role;
import com.saybridge.entity.User;
import com.saybridge.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {

        OAuth2User oAuth2User = super.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId().toLowerCase();

        String email = null;
        String name = null;
        String nickname = null;
        AuthProvider provider = null;

        Map<String, Object> attributes = oAuth2User.getAttributes();
        System.out.println("attributes = " + attributes);

        switch (registrationId) {
            case "naver":
                provider = AuthProvider.NAVER;
                Map<String, Object> naverAccount = (Map<String, Object>) attributes.get("response");
                email = (String) naverAccount.get("email");
                name = (String) naverAccount.get("name");
                nickname = (String) naverAccount.get("nickname");
                String naverGender = (String) naverAccount.get("gender");
                break;

            case "kakao":
                provider = AuthProvider.KAKAO;

                Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
                if (kakaoAccount != null) {
                    email = "kakaoLogin";
                    Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");
                    if (profile != null) {
                        name = (String) profile.get("nickname");
                    }

                }
                break;

            case "google":
                provider = AuthProvider.GOOGLE;
                email = (String) attributes.get("email");
                name = (String) attributes.get("name");
                nickname = (String) attributes.get("given_name");
                break;

            default:
                throw new IllegalArgumentException("지원하지 않는 OAuth Provider: " + registrationId);
        }

        if (email != null) {
            Optional<User> userOptional = userRepository.findByEmail(email);
            if (userOptional.isEmpty()) {
                User newUser = new User();
                newUser.setEmail(email);
                newUser.setUserName(name);
                newUser.setNickname(nickname);
                newUser.setProvider(provider);
                newUser.setRole(Role.USER);
                userRepository.save(newUser);
            }
        }

        return oAuth2User;
    }
}
