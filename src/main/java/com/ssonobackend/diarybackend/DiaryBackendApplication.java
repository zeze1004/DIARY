package com.ssonobackend.diarybackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import springfox.documentation.swagger2.annotations.EnableSwagger2;
// import Lombok.ReuiredArgsConstructor;

@EnableSwagger2
@SpringBootApplication
public class DiaryBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(DiaryBackendApplication.class, args);
    }

}
