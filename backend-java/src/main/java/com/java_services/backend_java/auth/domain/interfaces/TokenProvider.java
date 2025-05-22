package com.java_services.backend_java.auth.domain.interfaces;

public interface TokenProvider {
    String generateToken(String subject);
    boolean validateToken(String token);
    String extractSubject(String token);
}
