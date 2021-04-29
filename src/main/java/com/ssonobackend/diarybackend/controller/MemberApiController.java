package com.ssonobackend.diarybackend.controller;


import com.ssonobackend.diarybackend.domain.dto.MemberDTO;
import com.ssonobackend.diarybackend.security.JwtTokenProvider;
import com.ssonobackend.diarybackend.service.MemberService;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api/user")
public class MemberApiController {

    @Autowired
    private MemberService memberService;

    private final JwtTokenProvider jwtTokenProvider;

    private final PasswordEncoder passwordEncoder;

    // 로그인
    @PostMapping(value = "/login")
    public String login(@RequestBody MemberDTO.loginDTO ldto) throws NotFoundException {
        MemberDTO.usertokenDTO ustoken = memberService.login(ldto);
        // 로그인 실패
        if(ustoken == null){
            throw new NotFoundException("email이 없습니다.");
        }else if (!passwordEncoder.matches(ldto.getPassword(), ustoken.getPassword())){
            throw new IllegalArgumentException("비밀번호가 잘못되었습니다.");
        }
        return jwtTokenProvider.createToken(ustoken.getId().toString(), ustoken.getType());
    }

    //회원가입
    @PostMapping("/signup")
    public void signup(@Valid @RequestBody MemberDTO.signupDTO sdto) throws NotFoundException {

        // 아이디 한번 더 검사
        memberService.checkId(sdto.getEmail());
        sdto.setPassword(passwordEncoder.encode(sdto.getPassword()));
        if(memberService.signup(sdto) == null){
            throw new NotFoundException("에러 발생");
        }
    }
}
