package com.java_services.backend_java.api.account.infra.adapters;

import jakarta.mail.MessagingException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import com.java_services.backend_java.api.account.infra.adapters.EmailSenderAdapter;

@SpringBootTest
@ActiveProfiles("test")
public class EmailSenderAdapterTest {

    @Autowired
    private EmailSenderAdapter emailSenderAdapter;

    @Test
    public void testSendEmail() throws MessagingException {
        emailSenderAdapter.setToAddress("rudnei@itarget.com.br");
        emailSenderAdapter.setSubject("Teste com JavaMailSender");
        emailSenderAdapter.setBody("Este é um teste com integração ao Spring Boot Mail.");

        emailSenderAdapter.sendEmail();
    }
}