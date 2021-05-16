package com.ssonobackend.diarybackend.service;

import com.ssonobackend.diarybackend.domain.entity.Journal;
import com.ssonobackend.diarybackend.domain.dto.PostsSaveRequestDto;
import com.ssonobackend.diarybackend.domain.dto.PostsUpdateRequestDto;
import com.ssonobackend.diarybackend.domain.entity.Member;
import com.ssonobackend.diarybackend.repository.JournalRepository;
import com.ssonobackend.diarybackend.repository.MemberRepository;
import com.ssonobackend.diarybackend.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Service

public class PostsService {
    private final PostRepository postsRepository;
    private final MemberRepository memberRepository;
    private final JournalRepository journalRepository;
    @Transactional
    // 저장
    public void save(Long date, PostsSaveRequestDto requestDto) {
        Optional<Member> member = memberRepository.findById(requestDto.getWriter());
        member.ifPresent(m -> {
            requestDto.setDate(date);
            postsRepository.save(requestDto.toEntity(m));
        });
    }

    @Transactional
    // 수정
    public Long update(Long date, PostsUpdateRequestDto requestDto) {
        Journal posts = postsRepository.findByWriterAndDate(requestDto.getWriter(), date)
                .orElseThrow(() -> new IllegalArgumentException("해당 일정에 일기가 없습니다. date=" + date));
        //
        posts.update(requestDto.getContents(), requestDto.getEmotion(), date);

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
