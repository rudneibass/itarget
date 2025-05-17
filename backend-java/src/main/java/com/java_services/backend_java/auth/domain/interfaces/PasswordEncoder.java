package com.java_services.backend_java.auth.domain.interfaces;

public interface PasswordEncoder {
    String encode(String rawPassword);
    boolean matches(String rawPassword, String encodedPassword);
}
