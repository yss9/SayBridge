package com.backend.dto;

import com.backend.entity.Language;
import com.backend.entity.TeacherProfile;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TeacherProfileDto {

    private Long id;
    private Long userId;
    private String teacherName;
    private String tag;
    private String description;
    private String imageUrl;
    private Language language;

    public TeacherProfileDto(TeacherProfile teacherProfile) {
        this.id = teacherProfile.getId();
        this.userId = teacherProfile.getUser().getId();
        this.teacherName = teacherProfile.getUser().getUsername();
        this.tag = teacherProfile.getTag();
        this.description = teacherProfile.getDescription();
        this.imageUrl = teacherProfile.getImageUrl();
        this.language = teacherProfile.getLanguage();
    }

}
