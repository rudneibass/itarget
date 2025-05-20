package com.java_services.backend_java.account.infra.adapters;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.java_services.backend_java.account.domain.interfaces.PasswordEncoder;

@Component
public class PasswordEncoderAdapter implements PasswordEncoder {

    private final BCryptPasswordEncoder encoder;

    public PasswordEncoderAdapter() {
        this.encoder = new BCryptPasswordEncoder();
    }

    @Override
    public String encode(String rawPassword) {
        return encoder.encode(rawPassword);
    }

    @Override
    public boolean matches(String rawPassword, String encodedPassword) {
        return encoder.matches(rawPassword, encodedPassword);
    }
}