package com.ssonobackend.diarybackend.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

public class MemberDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class loginDTO{
        String email;
        String password;
    }

    @Data
    @Builder
    public static class usertokenDTO{
        private Long id;
        List<String> type;
        String password;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    // @JsonFilter("userInfo")
    public static class infoDTO{
        private Long id;
        String email;
        String nick_name;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class signupDTO{
        String email;
        String password;
        String nick_name;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class updateDTO{
        String password;
        String nickname;
    }
}
