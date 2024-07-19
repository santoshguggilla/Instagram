package com.backend.instagram.configuration;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.File;

@Configuration
public class AppConfig {

    @Bean
    CommandLineRunner init() {
        return (args) -> {
            File uploadDir = new File("C:\\Users\\0084\\Desktop\\Instgram\\angular16-instagram\\src\\uploads");
            if (!uploadDir.exists()) {
                uploadDir.mkdir();
            }
        };
    }
}

