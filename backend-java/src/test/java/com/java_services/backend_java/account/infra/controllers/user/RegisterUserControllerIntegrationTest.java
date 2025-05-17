package com.java_services.backend_java.account.infra.controllers.user;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class RegisterUserControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void shouldRegisterUserSuccessfully() throws Exception {
        String requestBody = """
            {
                "name": "Charlie",
                "email": "charlie@example.com",
                "password": "senhaSegura123"
            }
        """;

        mockMvc.perform(post("/api/account/user/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Charlie"))
                .andExpect(jsonPath("$.email").value("charlie@example.com"));
    }
}
