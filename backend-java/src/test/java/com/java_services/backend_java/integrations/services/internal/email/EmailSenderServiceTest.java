package com.java_services.backend_java.integrations.services.internal.email;
import jakarta.mail.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockedStatic;
import org.springframework.stereotype.Component;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@Component
public class EmailSenderServiceTest {

    private EmailSenderIntegrationService emailSenderIntegrationService;

    @BeforeEach
    public void setup() {
        emailSenderIntegrationService = new EmailSenderIntegrationService("fake@example.com", "password123");
    }

    @Test
    public void testSendEmailSuccess() {
        try (MockedStatic<Transport> mockedTransport = mockStatic(Transport.class)) {
            mockedTransport.when(() -> Transport.send(any(Message.class))).thenAnswer(invocation -> null);
        
            assertDoesNotThrow(() -> {
                emailSenderIntegrationService.sendEmail("destinatario@teste.com", "Teste de Assunto", "Corpo do email");
            });
        
            mockedTransport.verify(() -> Transport.send(any(Message.class)), times(1));
        }
    }
}
