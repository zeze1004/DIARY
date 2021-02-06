package com.ssonobackend.diarybackend.controller;

import com.ssonobackend.diarybackend.domain.dto.PostsResponseDto;
import com.ssonobackend.diarybackend.domain.dto.PostsSaveRequestDto;
import com.ssonobackend.diarybackend.domain.dto.PostsUpdateRequestDto;
import com.ssonobackend.diarybackend.service.PostsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController

public class PostsApiController {
    private final PostsService postsService;
    // 등록
    @PostMapping("/diary")
    public Long save(@RequestBody PostsSaveRequestDto requestDto) {
        return postsService.save(requestDto);
    }
    // 수정
    @PutMapping("/diary/{date}")
    public Long update(@PathVariable Long date, @RequestBody PostsUpdateRequestDto requestDto) {
        return postsService.update(date, requestDto);
    }

//    @GetMapping
//    public PostsResponseDto findById (@PathVariable String date) {
//        return postsService.findById(data);
//    }
}