package com.java_services.backend_java.account.domain.repositories.passwordResetToken.db;

import com.java_services.backend_java.account.domain.interfaces.Database;
import org.springframework.stereotype.Repository;

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
