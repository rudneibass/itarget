package com.java_services.backend_java.account.domain.repositories.passwordResetToken.db;

import com.java_services.backend_java.account.domain.entities.passwordResetToken.PasswordResetToken;
import com.java_services.backend_java.account.domain.interfaces.Database;
import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public class ReadPasswordResetTokenRepository {

    private final Database database;

    public ReadPasswordResetTokenRepository(Database database) {
        this.database = database;
    }

    public PasswordResetToken getByToken(String token) {
        Map<String, Object> 
        row = 
        database.rawQuery("SELECT * FROM password_reset_tokens WHERE token = ?", token)
        .stream()
        .findFirst()
        .orElse(null);

        if (row == null) return null;

        return 
            PasswordResetToken
            .builder()
            .token((String) row.get("token"))
            .userId((Long) row.get("user_id"))
            .expirationTime((Long) row.get("expiration_time"))
            .build();
        
    }
}
