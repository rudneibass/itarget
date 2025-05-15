package com.java_services.backend_java.account.domain.repositories.user.db;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

import com.java_services.backend_java.account.domain.interfaces.Database;
import com.java_services.backend_java.account.domain.valueObjects.Email;
import com.java_services.backend_java.account.domain.entities.user.User;

@SpringBootTest
@Transactional
@ActiveProfiles("test")
public class UpdateUserRepositoryIntegrationTest {

    @Autowired
    private Database database;

    @Autowired
    private EntityManager entityManager;

    @BeforeEach
    public void setUp() {
        entityManager.createNativeQuery("DROP TABLE IF EXISTS users").executeUpdate();
        entityManager.createNativeQuery(
            "CREATE TABLE users (" +
            "id BIGSERIAL PRIMARY KEY, " +
            "name VARCHAR(255), " +
            "email VARCHAR(255), " +
            "password VARCHAR(255))"
        ).executeUpdate();
        entityManager.createNativeQuery("INSERT INTO users (name, email, password) VALUES ('Alice', 'alice@example.com', '123mudar')").executeUpdate();
        entityManager.createNativeQuery("INSERT INTO users (name, email, password) VALUES ('Bob', 'bob@example.com', '123mudar')").executeUpdate();
    }

    @AfterEach
    public void tearDown() {
        entityManager.createNativeQuery("DELETE FROM users").executeUpdate();
    }
    
    @Test
    public void testUpdateUser_withBirthDate_updatesUserIncludingBirthDate() {
        UpdateUserRepository 
        updateUserRepository = new UpdateUserRepository(database);

        ReadUserRepository 
        readUserRepository = new ReadUserRepository(database);

        List<User> users = readUserRepository.all();
        User user = users.get(0);

        user.changeName("Bob with Birthdate");
        user.changePassword("novaSenha456");
        user.changeEmail(new Email("bob.birth@example.com"));
       
        System.out.println(user.getId());

        int affectedRows = updateUserRepository.update(user);
        assertThat(affectedRows).isEqualTo(1);

        List<User> updatedUsers = readUserRepository.all();
        User result = updatedUsers.stream()
            .filter(u -> u.getId().equals(user.getId()))
            .findFirst()
            .orElseThrow();
    
        assertThat(result.getName()).isEqualTo("Bob with Birthdate");
        assertThat(result.getEmail().getAddress()).isEqualTo("bob.birth@example.com");
        assertThat(result.getPassword()).isEqualTo("novaSenha456");
    }
}
