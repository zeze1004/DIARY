package com.ssonobackend.diarybackend.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor

public class PostsUpdateRequestDto {
    private String contents;
    private Integer emotion;
    private Long date;

    @Builder
    public PostsUpdateRequestDto(String contents, Integer emotion, Long date) {
        this.contents = contents;
        this.emotion= emotion;
        this.date = date;
    }
}