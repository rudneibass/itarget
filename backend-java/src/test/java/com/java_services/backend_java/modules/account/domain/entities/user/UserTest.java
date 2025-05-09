package com.java_services.backend_java.modules.account.domain.entities.user;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.java_services.backend_java.modules.account.domain.valueObjects.Email;

import static org.junit.jupiter.api.Assertions.*;

class UserTest {

    private User user;
    private Email validEmail;

    @BeforeEach
    void setUp() {
        validEmail = new Email("test@example.com");
        UserDto dto = new UserDto(1L, "John Doe", validEmail, "password123");
        user = new User(dto);
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
        UserDto dto = new UserDto(null, "John Doe", validEmail, "password123");
        // Se ID for validado na entidade, adapte aqui conforme sua regra
        User user = new User(dto);
        assertNull(user.getId());
    }

    @Test
    void testUserConstructor_invalidName() {
        UserDto dto = new UserDto(1L, "", validEmail, "password123");

        IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class, () -> {
            new User(dto);
        });
        assertEquals("User name cannot be null or empty.", thrown.getMessage());
    }

    @Test
    void testUserConstructor_invalidEmail() {
        UserDto dto = new UserDto(1L, "John Doe", null, "password123");

        IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class, () -> {
            new User(dto);
        });

        assertEquals("Email cannot be null or empty.", thrown.getMessage());
    }

    @Test
    void testUserConstructor_invalidPassword() {
        UserDto dto = new UserDto(1L, "John Doe", validEmail, "");

        IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class, () -> {
            new User(dto);
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
