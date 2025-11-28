package com.java_services.backend_java.api.account.domain.repositories.passwordResetToken.db;

import org.springframework.stereotype.Repository;

import com.java_services.backend_java.api.account.domain.interfaces.Database;

@Repository
public class DeletePasswordResetTokenRepository {

    private final Database database;

    public DeletePasswordResetTokenRepository(Database database) {
        this.database = database;
    }

    public int delete(String token) {
        if (token == null) {
            throw new IllegalArgumentException("Token é obrigatório.");
        }
        return database.executeDelete("DELETE FROM password_reset_tokens WHERE token = ?", token);
    }
}
