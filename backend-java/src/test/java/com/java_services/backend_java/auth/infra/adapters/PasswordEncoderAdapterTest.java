package com.java_services.backend_java.auth.infra.adapters;

import com.java_services.backend_java.auth.domain.interfaces.PasswordEncoder;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class PasswordEncoderAdapterTest {

    private PasswordEncoder passwordEncoder;

    @BeforeEach
    void setUp() {
        passwordEncoder = new PasswordEncoderAdapter();
    }

    @Test
    void shouldEncodePassword() {
        String rawPassword = "mySecret123";
        String encoded = passwordEncoder.encode(rawPassword);

        assertNotNull(encoded);
        assertNotEquals(rawPassword, encoded);
    }

    @Test
    void shouldMatchEncodedPassword() {
        String rawPassword = "anotherSecret456";
        String encoded = passwordEncoder.encode(rawPassword);

        assertTrue(passwordEncoder.matches(rawPassword, encoded));
    }

    @Test
    void shouldNotMatchWrongPassword() {
        String rawPassword = "correctPassword";
        String encoded = passwordEncoder.encode(rawPassword);

        assertFalse(passwordEncoder.matches("wrongPassword", encoded));
    }
}