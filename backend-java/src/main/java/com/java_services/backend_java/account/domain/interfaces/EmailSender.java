package com.java_services.backend_java.account.domain.interfaces;

import jakarta.mail.MessagingException;
public interface EmailSender {
    void sendEmail() throws MessagingException;
    void setToAddress(String toAddress);
    void setSubject(String subject);
    void setBody(String body);
}