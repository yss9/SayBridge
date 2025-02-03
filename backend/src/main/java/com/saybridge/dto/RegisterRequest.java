package com.saybridge.dto;

import lombok.Data;

@Data
public class RegisterRequest {

    private String email;
    private String userName;
    private String nickname;
    private String password;

}
