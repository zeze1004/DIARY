package com.ssonobackend.diarybackend.domain;

import com.ssonobackend.diarybackend.domain.Role;
import com.ssonobackend.diarybackend.BaseTimeEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Member extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;


    @Enumerated(EnumType.STRING)  //JPA로 데이터베이스로 저장할 때 Enum 값을 어떤 형태로 저장할지 결정
    @Column(nullable = false)     //기본적으로 int로 된 숫자가 저장됨, 숫자로하면 의미를 알 수 없어 문자열로 수정
    private Role role;

    @Builder
    public Member(String name, String email, Role role) {
        this.name = name;
        this.email = email;
        this.role = role;
    }

    public Member update(String name) {
        this.name = name;
        return this;
    }

    public String getRoleKey() {
        return this.role.getKey();
    }
}
