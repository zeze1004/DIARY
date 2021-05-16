package com.ssonobackend.diarybackend.domain.dto;

import com.ssonobackend.diarybackend.domain.entity.Journal;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PostsSaveRequestDto {
    private Long date;
    private String contents;
    private Integer emotion;


    @Builder
    public PostsSaveRequestDto(String contents, Integer emotion, Long date) {
        this.contents = contents;
        this.emotion = emotion;
        this.date = date;
    }

    public Journal toEntity() {
        return Journal.builder()
                .date(date)
                .emotion(emotion)
                .contents(contents)
                .build();
    }
}
