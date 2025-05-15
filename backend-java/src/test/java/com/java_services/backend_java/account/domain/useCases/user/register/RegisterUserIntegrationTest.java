package com.java_services.backend_java.account.domain.useCases.user.register;

import com.java_services.backend_java.account.domain.entities.user.UserDto;
import com.java_services.backend_java.account.domain.interfaces.Database;
import com.java_services.backend_java.account.domain.repositories.user.db.CreateUserRepository;
import com.java_services.backend_java.account.domain.useCases.use.RegisterUser;
import com.java_services.backend_java.account.domain.valueObjects.Email;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@ActiveProfiles("test")
class RegisterUserIntegrationTest {

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
        RegisterUser 
        registerUser = new RegisterUser(database);
        
        UserDto
        user =
        UserDto.builder()
            .id(null)
            .name("Charlie")
            .email(new Email("charlie@example.com"))
            .password("senhaSegura123")
            .build();
  
        UserDto
        newUser =
        registerUser.execute(user);
        assertThat(newUser.getName()).isEqualTo("Charlie");
        assertThat(newUser.getEmail().getAddress()).isEqualTo("charlie@example.com");
    }
}
