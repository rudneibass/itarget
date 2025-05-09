package com.java_services.backend_java.modules.account.domain.valueObjects;

import org.junit.jupiter.api.Test;

import com.java_services.backend_java.modules.account.domain.valueObjects.Email;

import static org.junit.jupiter.api.Assertions.*;

class EmailTest {

    @Test
    void shouldCreateEmailWithValidAddress() {
        Email email = new Email("Test@Example.com");
        assertEquals("test@example.com", email.getAddress()); // normalizado para minúsculo
    }

    @Test
    void shouldThrowExceptionForNullEmail() {
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            new Email(null);
        });
        assertEquals("Email cannot be null or empty.", exception.getMessage());
    }

    @Test
    void shouldThrowExceptionForEmptyEmail() {
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            new Email("   ");
        });
        assertEquals("Email cannot be null or empty.", exception.getMessage());
    }

    @Test
    void shouldThrowExceptionForInvalidFormat() {
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            new Email("invalid-email");
        });
        assertTrue(exception.getMessage().startsWith("Invalid email format:"));
    }

    @Test
    void shouldBeEqualWhenSameAddress() {
        Email email1 = new Email("user@example.com");
        Email email2 = new Email("USER@EXAMPLE.COM");

        assertEquals(email1, email2);
        assertEquals(email1.hashCode(), email2.hashCode());
    }

    @Test
    void shouldReturnEmailAsString() {
        Email email = new Email("hello@world.com");
        assertEquals("hello@world.com", email.toString());
    }
}
