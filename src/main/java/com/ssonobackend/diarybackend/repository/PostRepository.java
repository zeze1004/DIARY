package com.ssonobackend.diarybackend.repository;

import com.ssonobackend.diarybackend.domain.entity.Journal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Journal, Long> {
    Optional<Journal> findByWriterAndDate(Long writer, Long date);
}
