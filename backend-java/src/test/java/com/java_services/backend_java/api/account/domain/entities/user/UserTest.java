package com.java_services.backend_java.api.account.domain.entities.user;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.java_services.backend_java.api.account.domain.valueObjects.Email;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

class UserTest {

    private User user;
    private Email validEmail;

    @BeforeEach
    void setUp() {
        validEmail = new Email("test@example.com");
        UserDto dto = UserDto.builder()
                .id(1L)
                .name("John Doe")
                .email(validEmail)
                .password("password123")
                .birthDate(LocalDate.of(1990, 1, 1))
                .build();
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
        UserDto dto = UserDto.builder()
                .id(null)
                .name("John Doe")
                .email(validEmail)
                .password("password123")
                .build();
        User user = new User(dto);
        assertNull(user.getId());
    }

    @Test
    void testUserConstructor_invalidName() {
        UserDto dto = UserDto.builder()
                .id(1L)
                .name("")
                .email(validEmail)
                .password("password123")
                .build();

        IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class, () -> {
            new User(dto);
        });
        assertEquals("User name cannot be null or empty.", thrown.getMessage());
    }

    @Test
    void testUserConstructor_invalidEmail() {
        UserDto dto = UserDto.builder()
                .id(1L)
                .name("John Doe")
                .email(null)
                .password("password123")
                .build();

        IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class, () -> {
            new User(dto);
        });

        assertEquals("Email cannot be null or empty.", thrown.getMessage());
    }

    @Test
    void testUserConstructor_invalidPassword() {
        UserDto dto = UserDto.builder()
                .id(1L)
                .name("John Doe")
                .email(validEmail)
                .password("")
                .build();

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