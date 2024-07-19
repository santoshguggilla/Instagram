//import org.springframework.context.annotation.Configuration;

//import org.springframework.context.annotation.Configuration;

//package com.backend.Instagram.configuration;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//
////
////import org.springframework.context.annotation.Bean;
////import org.springframework.context.annotation.Configuration;
////import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
////import org.springframework.security.config.annotation.web.builders.HttpSecurity;
////import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
////import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
////import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
////
////@Configuration
////public class SecurityConfig {
////
////    @Bean
////    public BCryptPasswordEncoder bCryptPasswordEncoder() {
////        return new BCryptPasswordEncoder();
////    }
////    
////   
////}
//
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig extends WebSecurityConfigurerAdapter {
//
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http.cors().configurationSource(request -> {
//            CorsConfigurationBuilder cors = new CorsConfigurationBuilder();
//            cors.allowOrigin("http://localhost:4200"); // Allow requests from your Angular app
//            cors.allowAllMethods(); // Allow all HTTP methods (adjust as needed)
//            cors.allowCredentials(true); // Set to true if your API requires cookies/sessions
//            return cors.build();
//        });
//        // ... other security configurations
//    }
//}
//
