package com.ssonobackend.diarybackend;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;
import lombok.Getter;

//@Getter
//@Data
//@MappedSuperclass
//@EntityListeners(AuditingEntityListener.class)
//
//public class BaseTimeEntity {
//    @CreatedDate
//    private LocalDateTime createdDate;
//
//    @LastModifiedDate
//    private LocalDateTime modifiedDate;
//}
