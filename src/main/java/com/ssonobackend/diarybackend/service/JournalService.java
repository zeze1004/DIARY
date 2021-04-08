package com.ssonobackend.diarybackend.service;

import com.ssonobackend.diarybackend.domain.Journal;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface JournalService {
    List<Journal> findAll();
    List<Journal> findByEmotion(String emotion);
    Journal findByDate(Long date);
}
