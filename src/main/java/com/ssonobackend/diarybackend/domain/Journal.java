package com.ssonobackend.diarybackend.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Builder;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity(name = "JOURNAL")
@Data
//@AllArgsConstructor
@NoArgsConstructor
public class Journal  {
    @Id
    @Column(name = "DATE")
    //@GeneratedValue(generator = "uuid")
    //@GenericGenerator(name = "uuid", strategy = "uuid2")
    private Long date;

    @Column(name = "CONTENTS")
    private String contents;

    @Column(name = "EMOTION")
    private String emotion; //숫자로

    @Builder
    public Journal(String contents, String emotion, Long date) {
        this.contents = contents;
        this.emotion = emotion;
        this.date = date;
    }
    // update 기능에서 DB에 쿼리를 날리는 부분X, JPA 영속성 컨텍스트(엔티티를 영구 저장하는 환경)
    // 트랜잭션 안에서 DB에서 데이터를 가져오면 데이터는 영속성 컨텍스트가 유지
    // 이 상태에서 해당 데이터 값 변경시 트랜잭션이 끝나는 시점에서 해당 테이블에 변경분을 반영
    // 즉, Entity 객체의 값만 변경하면 별도로 Update 쿼리를 날리 필요 X => 이 개념을 '더티 체킹'이라 한다
    public void update(String contents, String emotion, Long date) {
        this.contents = contents;
        this.emotion = emotion;
        this.date = date;
    }

}