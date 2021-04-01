package com.ssonobackend.diarybackend.config.auth.dto;

import com.ssonobackend.diarybackend.domain.Member;
import com.ssonobackend.diarybackend.domain.Role;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Getter
public class OAuthAttributes {
    private Map<String, Object> attributes;
    private String nameAttributeKey;
    private String name;
    private String email;

    @Builder
    public OAuthAttributes(Map<String, Object> attributes, String nameAttributeKey, String name, String email) {
        this.attributes = attributes;
        this.nameAttributeKey = nameAttributeKey;
        this.name = name;
        this.email = email;
    }

    // of() : OAuth2User에서 반환하는 사용자 정보는 Map이기 때문에 값 하나하나를 변환.
    public static OAuthAttributes of(String userNameAttributeName, Map<String, Object> attributes) {
            return ofNaver("id", attributes);
    }

    private static OAuthAttributes ofNaver(String userNameAttributeName, Map<String, Object> attributes) {
        Map<String, Object> response = (Map<String, Object>) attributes.get("response") ;

        return OAuthAttributes.builder()
                .name((String) response.get("name"))
                .email((String) response.get("email"))
                .attributes(response)
                .nameAttributeKey(userNameAttributeName)
                .build() ;
    }

    // toEntity() : User엔티티 생성, 엔티티를 생성하는 시점은 처음 가입때
    // 가입할 때 기본권한을 GUEST로 주기 위해 role 빌더값에는 Role.GUEST를 사용함
    // OAuthAttribute클래스 생성이 끝났으면 같은 패키지에 SessionUser 클래스를 생성
    public Member toEntity() {
        return Member.builder()
                .name(name)
                .email(email)
                .role(Role.GUEST)
                .build();
    }
}
