package com.java_services.backend_java.account.domain.repositories.passwordResetToken.db;

import com.java_services.backend_java.account.domain.entities.passwordResetToken.PasswordResetToken;
import com.java_services.backend_java.account.domain.interfaces.Database;
import java.util.ArrayList;
import java.util.List;

public class CreatePasswordResetTokenRepository {
    private final Database database;
    public CreatePasswordResetTokenRepository(Database databaseAdapter){
        this.database = databaseAdapter;
    }

    public Long create(PasswordResetToken passwordResetToken) {
        StringBuilder sql = new StringBuilder("INSERT INTO password_reset_tokens (token, user_id, expiration_time");
        StringBuilder values = new StringBuilder("VALUES (?, ?, ?");

        List<Object> parameters = new ArrayList<>();
        parameters.add(passwordResetToken.getToken());
        parameters.add(passwordResetToken.getUserId());
        parameters.add(passwordResetToken.getExpirationTime());

        sql
        .append(") ")
        .append(values)
        .append(") ");

        Object result = database.executeInsert(sql.toString(), parameters.toArray());
        Long id = result != null ? Long.valueOf(result.toString()) : null;

        return id;
    }
}
