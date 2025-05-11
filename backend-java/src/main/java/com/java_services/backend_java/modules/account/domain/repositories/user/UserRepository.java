package com.java_services.backend_java.modules.account.domain.repositories.user;

import com.java_services.backend_java.modules.account.domain.entities.user.User;
import com.java_services.backend_java.modules.account.domain.entities.user.UserDto;
import com.java_services.backend_java.modules.account.domain.interfaces.Database;
import com.java_services.backend_java.modules.account.domain.valueObjects.Email;
import org.springframework.stereotype.Repository;
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
        return
        database.executeUpdate(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            user.getName(),
            user.getEmail().getAddress(),
            user.getPassword()
        );
    }

    public int update(User user) {
        return database.executeUpdate(
            "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?",
            user.getName(), 
            user.getEmail().getAddress(), 
            user.getPassword(), 
            user.getId()
        );
    }

    public List<User> all() {
        List<Map<String, Object>> 
        results = 
        database.rawQuery("SELECT * FROM users");
    
        return 
        results.stream()
        .map(row -> {
            return 
            new User(
                new UserDto(
                    (Long) row.get("id"),
                    (String) row.get("name"),
                    new Email((String) row.get("email")),
                    (String) row.get("password")
                )
            );
        }).collect(Collectors.toList());
    }
}
