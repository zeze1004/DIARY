package com.ssonobackend.diarybackend.repository;

import com.ssonobackend.diarybackend.domain.entity.Journal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.stream.Stream;


@Repository
public interface JournalRepository extends JpaRepository<Journal, Long> {
    Stream<Journal> findByEmotion(Integer emotion);
    Journal findByDate(Long date);
}