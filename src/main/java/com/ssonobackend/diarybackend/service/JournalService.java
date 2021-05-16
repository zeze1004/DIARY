package com.ssonobackend.diarybackend.service;

import com.ssonobackend.diarybackend.domain.entity.Journal;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface JournalService {
    List<Journal> findAll();
    List<Journal> findByEmotion();
    List<Journal> findByWriterAndEmotion(Long writer);
    Journal findByDate(Long date);
    Journal findByWriterAndDate(Long writer, Long Date);
    List<Journal> findByWriter(Long writer);
}
