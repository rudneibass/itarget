package com.java_services.backend_java.modules.account.domain.repositories.user.db;

import com.java_services.backend_java.modules.account.domain.entities.user.User;
import com.java_services.backend_java.modules.account.domain.interfaces.Database;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class CreateUserRepository {

    private final Database database;

    public CreateUserRepository(Database database) {
        this.database = database;
    }

    public int create(User user) {
        StringBuilder sql = new StringBuilder("INSERT INTO users (name, email, password");
        StringBuilder values = new StringBuilder("VALUES (?, ?, ?");

        List<Object> parameters = new ArrayList<>();
        parameters.add(user.getName());
        parameters.add(user.getEmail().getAddress());
        parameters.add(user.getPassword());

        Map<String, Object> 
        optionalFields = new LinkedHashMap<>();
        optionalFields.put("birth_date", user.getBirthDate());

        for (Map.Entry<String, Object> entry : optionalFields.entrySet()) {
            if (entry.getValue() != null) {
                sql.append(", ").append(entry.getKey());
                values.append(", ?");
                parameters.add(entry.getValue());
            }
        }

        sql
        .append(") ")
        .append(values)
        .append(") ");

        return database.executeInsertAndReturnId(sql.toString(), parameters.toArray());
    }
}
