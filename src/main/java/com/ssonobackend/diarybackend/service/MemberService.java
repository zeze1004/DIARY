package com.ssonobackend.diarybackend.service;

import com.ssonobackend.diarybackend.domain.dto.MemberDTO;
import com.ssonobackend.diarybackend.domain.entity.Member;
import com.ssonobackend.diarybackend.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class MemberService implements UserDetailsService {

    private final MemberRepository memberRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public MemberService(MemberRepository memberRepository, ModelMapper modelMapper) {
        this.memberRepository = memberRepository;
        this.modelMapper = modelMapper;
    }


    public Member signup(MemberDTO.signupDTO sdto) {
        Member member = modelMapper.map(sdto, Member.class);
        return memberRepository.save(member);
    }

    public boolean checkId(String id) {
        return memberRepository.existsByEmail(id);
    }

    // 이게 필요할까?
    // 중복 회원 검증
//    private void validateDuplicateMember(Member member) {
//        Optional<Member> findMembers = memberRepository.findByEmail(member.getEmail());
//        if (!findMembers.isEmpty()) {
//            throw new IllegalStateException("이미 존재하는 회원입니다");
//        }
//    }

    // 회원 전체 조회
    public List<Member> findMember() {
        return memberRepository.findAll();
    }

    public MemberDTO.usertokenDTO login(MemberDTO.loginDTO ldto) {
        Optional<Member> member = memberRepository.findByEmail(ldto.getEmail());
        if (member.isPresent()) {
            return MemberDTO.usertokenDTO.builder()
                    .id(member.get().getId())
                    .password(member.get().getPassword()).build();
        }
        return null;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return null;
    }

    // 회원 password 검색
//    public Member findOne(String email) {
//        return memberRepository.findByEmail(member.getEmail());
//    }
}
