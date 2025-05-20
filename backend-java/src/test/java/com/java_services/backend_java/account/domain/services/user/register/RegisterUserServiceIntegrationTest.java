package com.java_services.backend_java.account.domain.services.user.register;

import com.java_services.backend_java.account.domain.entities.user.UserDto;
import com.java_services.backend_java.account.domain.interfaces.Database;
import com.java_services.backend_java.account.domain.interfaces.PasswordEncoder;
import com.java_services.backend_java.account.domain.valueObjects.Email;
import com.java_services.backend_java.integrations.services.internal.email.EmailSenderIntegrationService;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
@ActiveProfiles("test")
class RegisterUserServiceIntegrationTest {

    @Autowired
    private Database database;

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private EmailSenderIntegrationService emailSenderIntegrationService;

    @Autowired
    private PasswordEncoder passwordEncoder;

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
        RegisterUserService 
        registerUserService = 
        new RegisterUserService(
            database, 
            emailSenderIntegrationService, 
            passwordEncoder
        );
        
        RegisterUserInputData
        user =
        RegisterUserInputData.builder()
            .name("Charlie")
            .email("charlie@example.com")
            .password("senhaSegura123")
            .build();
  
        RegisterUserOutputData
        newUser = registerUserService.execute(user);

        assertThat(newUser.getName()).isEqualTo("Charlie");
        assertThat(newUser.getEmail()).isEqualTo("charlie@example.com");
    }
}
