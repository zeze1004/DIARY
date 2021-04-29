package com.ssonobackend.diarybackend.domain.entity;

import com.ssonobackend.diarybackend.domain.Role;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@NoArgsConstructor
@ToString(of = {"id", "name", "email", "role"})
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;


    @Enumerated(EnumType.STRING)  // JPA로 데이터베이스로 저장할 때 Enum 값을 어떤 형태로 저장할지 결정
    @Column(nullable = false)     // 기본적으로 int로 된 숫자가 저장됨, 숫자로하면 의미를 알 수 없어 문자열로 수정
    private Role role;

    @OneToMany(mappedBy = "member")
    List<Journal> journalList = new ArrayList<>();


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
