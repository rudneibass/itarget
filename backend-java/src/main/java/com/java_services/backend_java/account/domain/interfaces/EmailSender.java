package com.java_services.backend_java.account.domain.interfaces;

public interface EmailSender {
    void sendEmail(String to, String subject, String text);
}
