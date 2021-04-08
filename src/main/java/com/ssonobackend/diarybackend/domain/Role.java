package com.ssonobackend.diarybackend.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {
    USER("ROLE_USER", "사용자"),
    ADMIN("ROLE_ADMIN", "관리자");

    private final String key;
    private final String title;

    // 스프링 시큐리티에서는 권한 코드에 항상 ROLE_ 가 앞에 있어야 함
}
