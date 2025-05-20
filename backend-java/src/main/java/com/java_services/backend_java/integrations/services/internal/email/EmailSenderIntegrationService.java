package com.java_services.backend_java.integrations.services.internal.email;

import java.util.Properties;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

import jakarta.mail.*;

public class EmailSenderIntegrationService {

    private final String username;
    private final String password;

    public EmailSenderIntegrationService(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public void sendEmail(String toAddress, String subject, String body) throws MessagingException {

        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });

        Message message = new MimeMessage(session);
        message.setFrom(new InternetAddress(username));
        message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toAddress));
        message.setSubject(subject);
        message.setText(body); 


        Transport.send(message);
        System.out.println("E-mail enviado com sucesso para " + toAddress);
    }
}
