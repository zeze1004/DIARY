package com.ssonobackend.diarybackend.repository;

import com.ssonobackend.diarybackend.domain.entity.Journal;
import com.ssonobackend.diarybackend.domain.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.DoubleStream;
import java.util.stream.Stream;


@Repository
public interface JournalRepository extends JpaRepository<Journal, Long> {
    Stream<Journal> findByEmotion(Integer emotion);
    Journal findByDate(Long date);
    Journal findByWriterAndDate(Long writer, Long date);
    List<Journal> findByWriter(Long writer);

    Stream<Journal> findByWriterAndEmotion(Long writer, int emotion);
}