package com.ssonobackend.diarybackend.config.auth;

import com.ssonobackend.diarybackend.domain.Member;
import com.ssonobackend.diarybackend.domain.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final CustomOAuth2UserService customOAuth2UserService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .headers().frameOptions().disable()
                .and()
                // Role 별 접근 권한 지정
                .authorizeRequests()
//                .antMatchers("/" ,"/**").permitAll()                 // 모든 Role이 접근 가능
//                .antMatchers("/admin/**").hasRole(Role.ADMIN.name()) // 관리자만 들어갈 수 있는 uri
                .anyRequest().authenticated()
                .and()
                .logout()
                // 로그아웃 성공 시 해당 주소로 이동
                .logoutSuccessUrl("/")
                .and()
                .oauth2Login()
                .userInfoEndpoint()
                .userService(customOAuth2UserService);
    }
}
