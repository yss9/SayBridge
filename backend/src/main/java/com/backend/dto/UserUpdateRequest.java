package com.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserUpdateRequest {
    private String username;
    private String nickname;
    private String imageUrl;
    private String password;
    private String newPassword;

}
