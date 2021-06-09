package com.ssonobackend.diarybackend.domain.dto;

import com.ssonobackend.diarybackend.domain.entity.Journal;

import com.ssonobackend.diarybackend.domain.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
public class PostsSaveRequestDto {
    @Setter
    private Long date;
    private Long writer;
    private String contents;
    private Integer emotion;


    @Builder
    public PostsSaveRequestDto(Long writer, String contents, Integer emotion) {
        this.writer = writer;
        this.contents = contents;
        this.emotion = emotion;
    }

    public Journal toEntity(Member writer) {
        return Journal.builder()
                .writer(writer)
                .date(date)
                .emotion(emotion)
                .contents(contents)
                .build();
    }
}
