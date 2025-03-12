package com.backend.dto;

import com.backend.entity.Language;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TeacherProfileUpdateRequest {

    private String description;
    private String tag;
    private Language language;
    private String imageUrl;

}
