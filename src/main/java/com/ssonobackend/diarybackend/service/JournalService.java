package com.ssonobackend.diarybackend.service;

import com.ssonobackend.diarybackend.domain.entity.Journal;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface JournalService {
    List<Journal> findAll();
    List<Journal> findByEmotion();
    Journal findByDate(Long date);
}
