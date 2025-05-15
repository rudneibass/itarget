package com.java_services.backend_java.account.domain.repositories.user.db;

import com.java_services.backend_java.account.domain.entities.user.User;
import com.java_services.backend_java.account.domain.entities.user.UserDto;
import com.java_services.backend_java.account.domain.interfaces.Database;
import com.java_services.backend_java.account.domain.valueObjects.Email;

import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.stream.Collectors;

@Repository
public class ReadUserRepository {

    private final Database database;

    public ReadUserRepository(Database database) {
        this.database = database;
    }

    public List<User> all() {
        List<Map<String, Object>> results = database.rawQuery("SELECT * FROM users");
        return 
        results.stream()
        .map(row -> 
            new User(
                UserDto.builder()
                .id((Long) row.get("id"))
                .name((String) row.get("name"))
                .email(new Email((String) row.get("email")))
                .password((String) row.get("password"))
                .build()
            )
        ).collect(Collectors.toList());
    }

    public User getById(Long id) {
        Map<String, Object> 
        row = database.rawQuery("SELECT * FROM users WHERE id = ?", id)
            .stream()
            .findFirst()
            .orElse(null);

        if (row == null) return null;

        return 
        new User(
            UserDto
            .builder()
            .id((Long) row.get("id"))
            .name((String) row.get("name"))
            .email(new Email((String) row.get("email")))
            .password((String) row.get("password"))
            .build()
        );
    }
}
