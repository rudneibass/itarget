package com.java_services.backend_java.account.domain.entities.passwordResetToken;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class PasswordResetToken {
    private String token;
    private Long userId;
    private Long expirationTime;

    public PasswordResetToken(String token, Long userId, Long expirationTime) {
        this.token = token;
        this.userId = userId;
        this.expirationTime = expirationTime;
    }
}
