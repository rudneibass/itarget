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
            .csrf().disable()
            .authorizeHttpRequests()
                .requestMatchers("/api/auth/**").permitAll()     // liberar endpoints de auth
                .requestMatchers("/api/account/**").permitAll()  // liberar endpoints de account
                .requestMatchers("/health/db").permitAll()
                .requestMatchers("/api/account/user/recover-password").permitAll()
                .anyRequest().authenticated();               // o restante precisa de auth

        return http.build();
    }
}
