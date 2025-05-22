package com.java_services.backend_java.account.infra.adapters;
import java.util.Properties;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import com.java_services.backend_java.account.domain.interfaces.EmailSender;

import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.Getter;
import lombok.Setter;
import jakarta.mail.*;


@Getter
@Setter
public class EmailSenderAdapterOld implements EmailSender {
    
    @Value("${email.username}")
    private String username;

    @Value("${email.password}")
    private String password;
    
    private String toAddress;
    private String subject;
    private String body;

    @Override
    public void sendEmail() throws MessagingException {
 
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(EmailSenderAdapterOld.this.username, EmailSenderAdapterOld.this.password);
            }
        });

        Message message = new MimeMessage(session);
        message.setFrom(new InternetAddress(this.username));
        message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(this.toAddress));
        message.setSubject(this.subject);
        message.setText(this.body); 

        Transport.send(message);
        System.out.println("E-mail enviado com sucesso para " + this.toAddress);
    }
}
