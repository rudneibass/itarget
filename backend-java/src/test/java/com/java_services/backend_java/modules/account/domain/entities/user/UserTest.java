package com.java_services.backend_java.modules.account.domain.entities.user;

import com.java_services.backend_java.modules.account.domain.valueObject.Email;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UserTest {

    private User user;
    private Email validEmail;

    @BeforeEach
    void setUp() {
        // Configurações iniciais
        validEmail = new Email("test@example.com");
        user = new User(1L, "John Doe", validEmail, "password123");
    }

    @Test
    void testUserConstructor_validInput() {
        assertNotNull(user);
        assertEquals(1L, user.getId());
        assertEquals("John Doe", user.getName());
        assertEquals(validEmail, user.getEmail());
        assertEquals("password123", user.getPassword());
    }

    @Test
    void testUserConstructor_invalidId() {
        IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class, () -> {
            new User(null, "John Doe", validEmail, "password123");
        });
        assertEquals("User ID cannot be null.", thrown.getMessage());
    }

    @Test
    void testUserConstructor_invalidName() {
        IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class, () -> {
            new User(1L, "", validEmail, "password123");
        });
        assertEquals("User name cannot be null or empty.", thrown.getMessage());
    }

    @Test
    void testUserConstructor_invalidEmail() {
        IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class, () -> {
            new User(1L, "John Doe", null, "password123");
        });
        assertEquals("User email cannot be null.", thrown.getMessage());
    }

    @Test
    void testUserConstructor_invalidPassword() {
        IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class, () -> {
            new User(1L, "John Doe", validEmail, "");
        });
        assertEquals("User password cannot be null or empty.", thrown.getMessage());
    }

    @Test
    void testChangeName_valid() {
        user.changeName("Jane Doe");
        assertEquals("Jane Doe", user.getName());
    }

    @Test
    void testChangeName_invalid() {
        IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class, () -> {
            user.changeName("");
        });
        assertEquals("New name cannot be null or empty.", thrown.getMessage());
    }

    @Test
    void testChangeEmail_valid() {
        Email newEmail = new Email("new@example.com");
        user.changeEmail(newEmail);
        assertEquals(newEmail, user.getEmail());
    }

    @Test
    void testChangeEmail_invalid() {
        IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class, () -> {
            user.changeEmail(null);
        });
        assertEquals("New email cannot be null.", thrown.getMessage());
    }

    @Test
    void testChangePassword_valid() {
        user.changePassword("newPassword123");
        assertEquals("newPassword123", user.getPassword());
    }

    @Test
    void testChangePassword_invalid() {
        IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class, () -> {
            user.changePassword("");
        });
        assertEquals("New password cannot be null or empty.", thrown.getMessage());
    }
}
