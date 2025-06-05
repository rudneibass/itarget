package com.java_services.backend_java.api.account.infra.adapters;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import com.java_services.backend_java.api.account.domain.interfaces.EmailSender;

@Component
@Setter
public class EmailSenderAdapter implements EmailSender {

    private String toAddress;
    private String subject;
    private String body;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private org.springframework.core.env.Environment env;

    @Override
    public void sendEmail() throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, false, "utf-8");

        helper.setTo(toAddress);
        helper.setSubject(subject);
        helper.setText(body, false);
        helper.setFrom(env.getProperty("spring.mail.username"));

        mailSender.send(message);
        System.out.println("E-mail enviado com sucesso para " + toAddress);
    }
}
