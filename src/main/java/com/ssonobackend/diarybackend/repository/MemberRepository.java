package com.ssonobackend.diarybackend.repository;

import com.ssonobackend.diarybackend.domain.Member;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;


public interface MemberRepository extends JpaRepository<Member, Long> {
    //소셜 로그인으로 반환되는 값 중 email을 통해 이미 생성된 사용자인지 처음 가입하는 사용자인지 판단하기 위함
    Optional<Member> findByEmail(String email);
}
