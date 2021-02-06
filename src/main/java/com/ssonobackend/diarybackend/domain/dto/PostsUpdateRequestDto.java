package com.ssonobackend.diarybackend.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor

public class PostsUpdateRequestDto {
    private String contents;
    private String emotion;
    private Long date;

    @Builder
    public PostsUpdateRequestDto(String contents, String emotion, Long date) {
        this.contents = contents;
        this.emotion= emotion;
        this.date = date;
    }
}