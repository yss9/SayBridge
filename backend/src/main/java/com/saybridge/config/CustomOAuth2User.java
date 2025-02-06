package com.saybridge.config;

import java.util.Collection;
import java.util.Map;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

public class CustomOAuth2User implements OAuth2User {

    private OAuth2User oauth2User;
    private Map<String, Object> customAttributes;

    public CustomOAuth2User(OAuth2User oauth2User, Map<String, Object> customAttributes) {
        this.oauth2User = oauth2User;
        this.customAttributes = customAttributes;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return customAttributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return oauth2User.getAuthorities();
    }

    /**
     * 여기서 getName()이 이메일을 반환하도록 설정합니다.
     */
    @Override
    public String getName() {
        String email = (String) customAttributes.get("email");
        return email != null ? email : oauth2User.getName();
    }
}
