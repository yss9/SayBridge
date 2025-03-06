package com.backend.dto;

import com.backend.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserProfileResponse {
    private String email;
    private String username;
    private String nickname;
    private String profileImageUrl;
    private Role role;

}
