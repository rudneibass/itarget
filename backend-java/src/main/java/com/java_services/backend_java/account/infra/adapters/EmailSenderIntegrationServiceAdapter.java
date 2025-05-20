package com.java_services.backend_java.account.infra.adapters;
import org.springframework.stereotype.Component;
import com.java_services.backend_java.account.domain.interfaces.EmailSender;
import com.java_services.backend_java.integrations.services.internal.email.EmailSenderIntegrationService;

@Component
public class EmailSenderIntegrationServiceAdapter implements EmailSender {
    private final EmailSenderIntegrationService emailSender;

    public EmailSenderIntegrationServiceAdapter(EmailSenderIntegrationService emailSenderIntegrationService) {
        this.emailSender = emailSenderIntegrationService;
    }

    @Override
    public void sendEmail(String to, String subject, String text) {
        try {
            this.emailSender.sendEmail(to, subject, text);    
        } catch (Exception e) {
            // TODO: log error
        }
    }
}
