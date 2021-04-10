package com.ssonobackend.diarybackend.config.auth.dto;

import com.ssonobackend.diarybackend.domain.Member;
import lombok.Getter;

import java.io.Serializable;

@Getter
public class SessionUser implements Serializable {
    private String name ;
    private String email ;

    public SessionUser(Member member) {
        this.name = member.getName() ;
        this.email = member.getEmail() ;
    }
}
