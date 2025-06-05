package com.java_services.backend_java.api.account.domain.repositories.user.db;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import com.java_services.backend_java.api.account.domain.entities.user.User;
import com.java_services.backend_java.api.account.domain.entities.user.UserDto;
import com.java_services.backend_java.api.account.domain.interfaces.Database;
import com.java_services.backend_java.api.account.domain.repositories.user.db.CreateUserRepository;
import com.java_services.backend_java.api.account.domain.valueObjects.Email;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
@ActiveProfiles("test")
public class CreateUserRepositoryIntegrationTest {

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
    public void testCreateUser_insertsNewUserSuccessfully() {
        CreateUserRepository createUserRepository = new CreateUserRepository(database);
        User newUser = new User(
            UserDto.builder()
                .id(null)
                .name("Charlie")
                .email(new Email("charlie@example.com"))
                .password("senhaSegura123")
                .build()
        );
        int id = createUserRepository.create(newUser);
        assertThat(id).isEqualTo(3); // 2 do setup + 1 novo
    }
}
