package com.java_services.backend_java.account.domain.services.user.register;

import com.java_services.backend_java.account.domain.interfaces.Database;
import com.java_services.backend_java.account.domain.interfaces.EmailSender;
import com.java_services.backend_java.account.domain.interfaces.PasswordEncoder;

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
public class RegisterUserServiceIntegrationTest {

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private Database databaseAdapter;

    @Autowired
    private EmailSender emailSenderAdapter;

    @Autowired
    private PasswordEncoder passwordEncoderAdapter;

    private RegisterUserService registerUserService;

    @BeforeEach
    public void setUp() {
        registerUserService = new RegisterUserService(
            databaseAdapter,
            emailSenderAdapter,
            passwordEncoderAdapter
        );

        entityManager.createNativeQuery("DROP TABLE IF EXISTS users").executeUpdate();
        entityManager.createNativeQuery(
            "CREATE TABLE users (" +
            "id BIGSERIAL PRIMARY KEY, " +
            "name VARCHAR(255), " +
            "email VARCHAR(255), " +
            "password VARCHAR(255), " +
            "birth_date DATE)"
        ).executeUpdate();
    }

    @AfterEach
    public void tearDown() {
        entityManager.createNativeQuery("DELETE FROM users").executeUpdate();
    }

    @Test
    public void testExecute_shouldRegisterNewUserAndSendEmail() {
        RegisterUserInputData 
        input = RegisterUserInputData.builder()
            .name("Charlie")
            .email("charlie@example.com")
            .password("senhaForte123")
            .birthDate(null) // ou LocalDate.of(1990, 1, 1)
            .build();

        RegisterUserOutputData 
        output = registerUserService.execute(input);

        assertThat(output.getName()).isEqualTo("Charlie");
        assertThat(output.getEmail()).isEqualTo("charlie@example.com");

    }

    @Test
    public void testExecute_shouldThrowExceptionWhenEmailAlreadyExists() {
        RegisterUserInputData firstInput = RegisterUserInputData.builder()
            .name("Charlie")
            .email("charlie@example.com")
            .password("senhaForte123")
            .birthDate(null)
            .build();

        registerUserService.execute(firstInput);


        RegisterUserInputData secondInput = RegisterUserInputData.builder()
            .name("Outro Nome")
            .email("charlie@example.com") // mesmo e-mail
            .password("outraSenha123")
            .birthDate(null)
            .build();


        IllegalArgumentException exception = org.junit.jupiter.api.Assertions.assertThrows(
            IllegalArgumentException.class,
            () -> registerUserService.execute(secondInput)
        );

        assertThat(exception.getMessage()).isEqualTo("Email já cadastrado para outro usuário.");
    }

}
