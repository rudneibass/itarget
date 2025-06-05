package com.java_services.backend_java.api.account.infra.adapters;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.java_services.backend_java.api.account.infra.adapters.PasswordEncoderAdapter;

import static org.junit.jupiter.api.Assertions.*;

class PasswordEncoderAdapterTest {

    private PasswordEncoderAdapter passwordEncoder;

    @BeforeEach
    void setUp() {
        passwordEncoder = new PasswordEncoderAdapter();
    }

    @Test
    void shouldEncodePassword() {
        String rawPassword = "mySecret123";
        String encodedPassword = passwordEncoder.encode(rawPassword);

        assertNotNull(encodedPassword);
        assertNotEquals(rawPassword, encodedPassword);
        assertTrue(encodedPassword.startsWith("$2a$") || encodedPassword.startsWith("$2b$") || encodedPassword.startsWith("$2y$"));
    }

    @Test
    void shouldMatchEncodedPassword() {
        String rawPassword = "anotherSecret456";
        String encodedPassword = passwordEncoder.encode(rawPassword);

        assertTrue(passwordEncoder.matches(rawPassword, encodedPassword));
    }

    @Test
    void shouldNotMatchDifferentPassword() {
        String rawPassword = "originalPassword";
        String encodedPassword = passwordEncoder.encode(rawPassword);

        assertFalse(passwordEncoder.matches("wrongPassword", encodedPassword));
    }
}
