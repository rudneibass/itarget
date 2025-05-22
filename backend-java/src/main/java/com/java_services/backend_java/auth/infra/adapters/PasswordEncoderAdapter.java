package com.java_services.backend_java.auth.infra.adapters;

import com.java_services.backend_java.auth.domain.interfaces.PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component("authPasswordEncoderAdapter")
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