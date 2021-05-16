package com.ssonobackend.diarybackend.domain.dto;

import lombok.Data;

import javax.persistence.Column;

@Data
public class JournalDto {
    private Long id;
    private Long date;
    private String contents;
    private Integer emotion;
    private Long writer;
}
