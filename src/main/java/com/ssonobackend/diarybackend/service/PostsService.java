package com.ssonobackend.diarybackend.service;

import com.ssonobackend.diarybackend.domain.Journal;
import com.ssonobackend.diarybackend.domain.dto.PostsSaveRequestDto;
import com.ssonobackend.diarybackend.domain.dto.PostsUpdateRequestDto;
import com.ssonobackend.diarybackend.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service

public class PostsService {
    private final PostRepository postsRepository;

    @Transactional
    // 저장
    public Long save(PostsSaveRequestDto requestDto) {
        return postsRepository.save(requestDto.toEntity()).getDate();
    }

    @Transactional
    // 수정
    public Long update(Long date, PostsUpdateRequestDto requestDto) {
        Journal posts = postsRepository.findById(date)
                .orElseThrow(() -> new IllegalArgumentException("해당 일정에 일기가 없습니다. date=" + date));
        //
        posts.update(requestDto.getContents(), requestDto.getEmotion(), requestDto.getDate());

        return date;
    }
//    public PostsResponseDto findById (String date) {
//        Journal en = postsRepository.findById(date)
//                .orElseThrow(() -> new IllegalArgumentException("해당 일정에 일기가 없습니다. date=" + date));
//        //
//        posts.update(requestDto.getContent(), requestDto.getEmotion(), requestDto.getDate());
//
//        return date;
//    }
}
