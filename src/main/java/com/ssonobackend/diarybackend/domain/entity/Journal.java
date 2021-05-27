package com.ssonobackend.diarybackend.domain.entity;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity @Getter
@Data
@ApiModel
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Journal  {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "journal_id")
    private Long id;

    @Column(name = "DATE")
    private Long date;

    @Column(name = "CONTENTS")
    private String contents;

    @Column(name = "EMOTION")
    private Integer emotion; //숫자로

    // 저날(일기 기록)이 `다`이므로 외래키 갖기
//    @OneToMany(fetch = FetchType.LAZY)
//    @JoinColumn(name = "member_num")
//    private Member member;



    @Builder
    public Journal(String contents, Integer emotion, Long date) {
        this.contents = contents;
        this.emotion = emotion;
        this.date = date;
    }
    // update 기능에서 DB에 쿼리를 날리는 부분X, JPA 영속성 컨텍스트(엔티티를 영구 저장하는 환경)
    // 트랜잭션 안에서 DB에서 데이터를 가져오면 데이터는 영속성 컨텍스트가 유지
    // 이 상태에서 해당 데이터 값 변경시 트랜잭션이 끝나는 시점에서 해당 테이블에 변경분을 반영
    // 즉, Entity 객체의 값만 변경하면 별도로 Update 쿼리를 날리 필요 X => 이 개념을 '더티 체킹'이라 한다
    public void update(String contents, Integer emotion, Long date) {
        this.contents = contents;
        this.emotion = emotion;
        this.date = date;
    }

}