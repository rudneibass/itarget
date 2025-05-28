package com.java_services.backend_java.configurations;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/account/**").permitAll()
                .requestMatchers("/health/db").permitAll()
                .requestMatchers("/api/account/user/recover-password").permitAll()
                .requestMatchers("/admin/home").permitAll()
                .requestMatchers("/admin/publicacoes").permitAll()
                .anyRequest().authenticated()
            );
        return http.build();
    }
}