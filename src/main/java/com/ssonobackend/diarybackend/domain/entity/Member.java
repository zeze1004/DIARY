package com.ssonobackend.diarybackend.domain.entity;

import com.ssonobackend.diarybackend.domain.Role;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
//@ToString(of = {"id", "name", "email", "password", "role"})
public class Member implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_num")
    private Long id;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String nick_name;

    @Column(nullable = false)
    private String email;


    @Enumerated(EnumType.STRING)  // JPA로 데이터베이스로 저장할 때 Enum 값을 어떤 형태로 저장할지 결정
    @Column(nullable = true)     // 기본적으로 int로 된 숫자가 저장됨, 숫자로하면 의미를 알 수 없어 문자열로 수정
    private Role role;

//    @OneToMany(mappedBy = "member")
//    private List<Journal> journalList = new ArrayList<>();


    @Builder
    public Member(Long id, String password, String nick_name, String email, Role role) {
        this.id = id;
        this.password = password;
        this.nick_name = nick_name;
        this.email = email;
        this.role = role;
    }

    public Member update(String password) {
        this.password = password;
        return this;
    }

    public String getRoleKey() {
        return this.role.getKey();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getUsername() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}
