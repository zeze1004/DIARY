package com.ssonobackend.diarybackend.repository;

import com.ssonobackend.diarybackend.domain.Journal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Journal, Long> {
}
