package com.java_services.backend_java.modules.account.domain.repositories.user;

import com.java_services.backend_java.modules.account.domain.entities.user.User;
import com.java_services.backend_java.modules.account.domain.entities.user.UserDto;
import com.java_services.backend_java.modules.account.domain.interfaces.Database;
import com.java_services.backend_java.modules.account.domain.valueObjects.Email;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Repository
public class UserRepository {

    private final Database database;

    public UserRepository(Database database) {
        this.database = database;
    }

    public int create(User user) {
        StringBuilder sql = new StringBuilder("INSERT INTO users (name, email, password");
        StringBuilder values = new StringBuilder("VALUES (?, ?, ?");
        
        List<Object> 
        parameters = new ArrayList<>();
        parameters.add(user.getName());
        parameters.add(user.getEmail().getAddress());
        parameters.add(user.getPassword());
    
        Map<String, Object> 
        optionalFields = new LinkedHashMap<>();
        optionalFields.put("birth_date", user.getBirthDate());
        for (Map.Entry<String, Object> entry : optionalFields.entrySet()) {
            if (entry.getValue() != null) {
                sql.append(", birth_date");
                values.append(", ?");
                parameters.add(user.getBirthDate());
            }
        }

        sql.append(") ").append(values).append(")");
    
        return database.executeUpdate(sql.toString(), parameters.toArray());
    }


    public int update(User user) {
        if (user.getId() == null || user.getId() <= 0) {
            throw new IllegalArgumentException("O ID do usuário é obrigatório e deve ser maior que zero.");
        }

        StringBuilder 
        sql = new StringBuilder("UPDATE users SET ");
        sql.append("name = ?, email = ?, password = ?");
        
        List<Object> 
        parameters = new ArrayList<>();
        parameters.add(user.getName());
        parameters.add(user.getEmail().getAddress());
        parameters.add(user.getPassword());

        Map<String, Object> 
        optionalFields = new LinkedHashMap<>();
        optionalFields.put("birth_date", user.getBirthDate());
        for (Map.Entry<String, Object> entry : optionalFields.entrySet()) {
            if (entry.getValue() != null) {
                sql.append(", ").append(entry.getKey()).append(" = :").append(entry.getKey());
                parameters.add(entry.getValue());
            }
        }

        sql.append(" WHERE id = ?");
        parameters.add(user.getId());
        int rowsAffected = database.executeUpdate(sql.toString(), parameters.toArray());
        if(rowsAffected == 0) {
            return rowsAffected;
        }

        return user.getId().intValue();
    }

    
    public List<User> all() {
        List<Map<String, Object>> results = database.rawQuery("SELECT * FROM users");
        return 
        results.stream()
            .map(row -> {
                return 
                new User(
                    UserDto.builder()
                    .id((Long) row.get("id"))
                    .name((String) row.get("name"))
                    .email(new Email((String) row.get("email")))
                    .password((String) row.get("password"))
                    .build()
                );
            }
        ).collect(Collectors.toList());
    }

    public User getById(Long id) {
        Map<String, Object> 
        row = database.rawQuery("SELECT * FROM users WHERE id = ?", id).stream().findFirst().orElse(null);
        
        if (row == null) {
            return null; 
        }
    
        return 
        new User(
            UserDto.builder()
            .id((Long) row.get("id"))
            .name((String) row.get("name"))
            .email(new Email((String) row.get("email")))
            .password((String) row.get("password"))
            .build()
        );
    }
    
}
