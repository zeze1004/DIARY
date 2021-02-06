package com.ssonobackend.diarybackend.service;

import com.ssonobackend.diarybackend.domain.Journal;
import com.ssonobackend.diarybackend.repository.JournalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Repository
public class JournalServicempl implements JournalService {
    @Autowired
    JournalRepository journalRepository;

    @Override
    public List<Journal> findAll() {
        return journalRepository.findAll();
    }

    @Override
    public List<Journal> findByEmotion() {
        return journalRepository.findByEmotion("1").collect(Collectors.toList());
    }

    @Override
    public Journal findByDate(Long date) {
        return journalRepository.findByDate(date);
    }
}
