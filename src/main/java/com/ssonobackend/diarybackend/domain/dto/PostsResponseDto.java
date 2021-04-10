package com.ssonobackend.diarybackend.domain.dto;

import com.ssonobackend.diarybackend.domain.Journal;
import lombok.Getter;
import lombok.Data;


@Data
public class PostsResponseDto {

    private Long date;
    private String contents;
    private Integer emotion;

    public PostsResponseDto(Journal entity) {
        this.date = entity.getDate();
        this.contents = entity.getContents();
        this.emotion = entity.getEmotion();
    }
}
