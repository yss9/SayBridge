package com.saybridge.service;

import com.saybridge.entity.AuthProvider;
import com.saybridge.entity.User;
import com.saybridge.repository.UserRepository;
import com.saybridge.config.CustomOAuth2User;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

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
                if (naverAccount != null) {
                    email = (String) naverAccount.get("email");
                    name = (String) naverAccount.get("name");
                    nickname = (String) naverAccount.get("nickname");
                }
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
                    nickname = "kakao";
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
                newUser.setUsername(name);
                newUser.setNickname(nickname);
                newUser.setProvider(provider);
                newUser.setRole(com.saybridge.entity.Role.USER);
                userRepository.save(newUser);
            }
        }
        Map<String, Object> customAttributes = new HashMap<>(attributes);
        customAttributes.put("email", email);
        customAttributes.put("name", name);
        customAttributes.put("nickname", nickname);

        return new CustomOAuth2User(oAuth2User, customAttributes);
    }
}
