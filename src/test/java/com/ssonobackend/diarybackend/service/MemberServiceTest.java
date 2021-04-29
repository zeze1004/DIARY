//package com.ssonobackend.diarybackend.service;
//
//import com.ssonobackend.diarybackend.domain.entity.Member;
//import com.ssonobackend.diarybackend.repository.MemberRepository;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.annotation.Rollback;
//import org.springframework.test.context.junit4.SpringRunner;
//import org.springframework.transaction.annotation.Transactional;
//
//import static org.junit.Assert.assertEquals;
//import static org.junit.jupiter.api.Assertions.*;
//
//@RunWith(SpringRunner.class)
//@SpringBootTest
//@Transactional
//class MemberServiceTest {
//    @Autowired
//    MemberService memberService;
//    @Autowired
//    MemberRepository memberRepository;
//
//    @Test
//    @Rollback(false)
//    public void 회원가입() throws Exception {
//        // given
//        Member member = new Member();
//        member.setName("zeze");
//
//        // when
//        Long savedId = memberService.join(member);
//
//        // then
//        assertEquals(member, memberRepository.findOne(savedId)); // 가입한 회원이랑 찾은 회원이랑 같으면 정상 가입(현재 db에 가입한 회원이 없음)
//    }
//}