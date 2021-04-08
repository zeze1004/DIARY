package com.ssonobackend.diarybackend.controller;

import com.ssonobackend.diarybackend.domain.Journal;
import com.ssonobackend.diarybackend.service.JournalService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import java.util.Collections;
import java.util.List;

@RestController
public class JournalApiController {
    
    // 필드 삽입 경고
    @Autowired
    JournalService journalService;

    @ApiOperation(value = "일기 조회", notes = "해당 날짜에 작성된 일기를 조회합니다.")
    @GetMapping("/diary/{date}")
    public Journal getDiary(@PathVariable("date") Long date) {
        return journalService.findByDate(date);
    }

    @ApiOperation(value = "모든 일기 리스트 찾기", notes = "작성된 일기 전체를 조회합니다.")
    @GetMapping("/diary/all")
    public List<Journal> getUserProfileList() {
        return journalService.findAll();
    }

    @ApiOperation(value = "행복한 일기 조회", notes = "행복한 일기 중 랜덤 1개를 조회합니다.")
    @GetMapping("/diary/happy")
    @Transactional
    public Journal getHappyDiary() {
        List<Journal> diary = journalService.findByEmotion("1");
        if(diary.isEmpty()) {
            return null;
        }
        Collections.shuffle(diary);
        return diary.get(0);
    }
}