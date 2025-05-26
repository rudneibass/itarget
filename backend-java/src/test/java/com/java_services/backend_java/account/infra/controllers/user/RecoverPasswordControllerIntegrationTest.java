package com.java_services.backend_java.account.infra.controllers.user;


import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
@ActiveProfiles("test")
public class RecoverPasswordControllerIntegrationTest {
    @Autowired
    private EntityManager entityManager;

    @Autowired
    private MockMvc mockMvc;

    @BeforeEach
    public void setUp() {

        entityManager.createNativeQuery("DROP TABLE IF EXISTS password_reset_tokens").executeUpdate();
        entityManager.createNativeQuery(
            "CREATE TABLE password_reset_tokens ("+
            "id serial NOT NULL,"+
            "token VARCHAR(255) PRIMARY KEY,"+
            "user_id BIGINT NOT NULL,"+
            "expiration_time BIGINT NOT NULL)"
        ).executeUpdate();
        
        entityManager.createNativeQuery("DROP TABLE IF EXISTS users").executeUpdate();
        entityManager.createNativeQuery(
            "CREATE TABLE users (" +
            "id BIGSERIAL PRIMARY KEY, " +
            "name VARCHAR(255), " +
            "email VARCHAR(255), " +
            "password VARCHAR(255), " +
            "birth_date DATE)"
        ).executeUpdate();
        entityManager.createNativeQuery("INSERT INTO users (name, email, password) VALUES ('Rudnei', 'rudnei@itarget.com.br', '123mudar')").executeUpdate();
    }

    @AfterEach
    public void tearDown() {
        entityManager.createNativeQuery("DELETE FROM password_reset_tokens").executeUpdate();
        entityManager.createNativeQuery("DELETE FROM users").executeUpdate();
    }

    @Test
    public void shouldRecoverPasswordSuccessfully() throws Exception {
        String requestBody = """
            {
                "email": "rudnei@itarget.com.br"
            }
        """;

        mockMvc.perform(post("/api/account/user/recover-password")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Operação realizada com sucesso. O usuario recebera um email com um link de recuperação de senha caso o endereço e-mail fornecido estiver cadastrado em nosso sistema."));
    }

    @Test
    public void shouldReturnBadRequestWhenEmailNotFound() throws Exception {
        String requestBody = """
            {
                "email": "emailinexistente@example.com"
            }
        """;

        mockMvc.perform(post("/api/account/user/recover-password")
            .contentType(MediaType.APPLICATION_JSON)
            .content(requestBody))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.message").value("E-mail não encontrado."));
    }
}
