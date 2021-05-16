package com.ssonobackend.diarybackend.controller;

import com.ssonobackend.diarybackend.domain.entity.Journal;
import com.ssonobackend.diarybackend.service.JournalService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/diary")
public class JournalApiController {
    
    // 필드 삽입 경고
    @Autowired
    JournalService journalService;

    @ApiOperation(value = "일기 조회", notes = "해당 날짜에 작성된 일기를 조회합니다.")
    @GetMapping("/{date}")
    public Journal getDiary(@PathVariable("date") Long date, @RequestBody Long writer) {
        return journalService.findByWriterAndDate(writer, date);
    }

//    @ApiOperation(value = "모든 사용자의 일기 리스트 찾기", notes = "작성된 일기 전체를 조회합니다.")
//    @GetMapping("/all")
//    public List<Journal> getAllDiary() {
//        return journalService.findAll();
//    }

    @ApiOperation(value = "사용자의 모든 일기 리스트 찾기", notes = "사용자가 작성한 일기 전체를 조회합니다.")
    @GetMapping("")
    public List<Journal> getUsersAllDiary(@RequestBody Long writer) {
        return journalService.findByWriter(writer);
    }

    @ApiOperation(value = "행복한 일기 조회", notes = "행복한 일기 중 랜덤 1개를 조회합니다.")
    @GetMapping("/happy")
    @Transactional
    public Journal getHappyDiary(@RequestBody Long writer) {
        List<Journal> diary = journalService.findByWriterAndEmotion(writer);
        if(diary.isEmpty()) {
            return null;
        }
        Collections.shuffle(diary);
        return diary.get(0);
    }
}