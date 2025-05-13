package com.java_services.backend_java.modules.account.domain.repositories.user.db;

import com.java_services.backend_java.modules.account.domain.entities.user.User;
import com.java_services.backend_java.modules.account.domain.interfaces.Database;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class UpdateUserRepository {

    private final Database database;

    public UpdateUserRepository(Database database) {
        this.database = database;
    }

    public int update(User user) {
        if (user.getId() == null || user.getId() <= 0) {
            throw new IllegalArgumentException("O ID do usuário é obrigatório e deve ser maior que zero.");
        }

        StringBuilder sql = new StringBuilder("UPDATE users SET ");
        sql.append("name = ?, email = ?, password = ?");

        List<Object> parameters = new ArrayList<>();
        parameters.add(user.getName());
        parameters.add(user.getEmail().getAddress());
        parameters.add(user.getPassword());

        Map<String, Object> optionalFields = new LinkedHashMap<>();
        optionalFields.put("birth_date", user.getBirthDate());

        for (Map.Entry<String, Object> entry : optionalFields.entrySet()) {
            if (entry.getValue() != null) {
                sql.append(", ").append(entry.getKey()).append(" = ?");
                parameters.add(entry.getValue());
            }
        }

        sql.append(" WHERE id = ?");
        parameters.add(user.getId());

        int rowsAffected = database.executeUpdate(sql.toString(), parameters.toArray());
        if (rowsAffected == 0) return 0;

        return user.getId().intValue();
    }
}
