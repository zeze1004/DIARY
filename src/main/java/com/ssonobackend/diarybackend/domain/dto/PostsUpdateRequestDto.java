package com.ssonobackend.diarybackend.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor

public class PostsUpdateRequestDto {
    private Long writer;
    private String contents;
    private Integer emotion;
    @Setter
    private Long date;

    @Builder
    public PostsUpdateRequestDto(Long writer, String contents, Integer emotion) {
        this.contents = contents;
        this.emotion= emotion;
        this.writer = writer;
    }
}