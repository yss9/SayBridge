package com.saybridge.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {

    private String email;
    private String username;
    private String nickname;
    private String password;

}
