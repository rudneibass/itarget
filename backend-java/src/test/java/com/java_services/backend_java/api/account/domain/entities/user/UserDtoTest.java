package com.java_services.backend_java.api.account.domain.entities.user;

import org.junit.jupiter.api.Test;

import com.java_services.backend_java.api.account.domain.entities.user.UserDto;
import com.java_services.backend_java.api.account.domain.valueObjects.Email;

import java.time.LocalDate;
import static org.junit.jupiter.api.Assertions.*;

class UserDtoTest {

    @Test
    void testBuilder_createsUserDtoSuccessfully() {
        Email email = new Email("test@example.com");
        LocalDate birthDate = LocalDate.of(1990, 1, 1);

        UserDto userDto = UserDto.builder()
                .id(1L)
                .name("John Doe")
                .email(email)
                .password("securePassword123")
                .birthDate(birthDate)
                .build();

        assertEquals(1L, userDto.getId());
        assertEquals("John Doe", userDto.getName());
        assertEquals(email, userDto.getEmail());
        assertEquals("securePassword123", userDto.getPassword());
        assertEquals(birthDate, userDto.getBirthDate());
    }

    @Test
    void testBuilder_withMissingOptionalFields() {
        Email email = new Email("test@example.com");

        UserDto userDto = UserDto.builder()
                .name("Jane Doe")
                .email(email)
                .password("anotherPassword")
                .build();

        assertNull(userDto.getId());
        assertNull(userDto.getBirthDate());
        assertEquals("Jane Doe", userDto.getName());
        assertEquals(email, userDto.getEmail());
        assertEquals("anotherPassword", userDto.getPassword());
    }

    @Test
    void testSettersAndGetters() {
        UserDto userDto = new UserDto(null, null, null, null, null);

        Email email = new Email("setget@example.com");
        LocalDate birthDate = LocalDate.of(2000, 5, 20);

        userDto.setId(10L);
        userDto.setName("Setter Getter");
        userDto.setEmail(email);
        userDto.setPassword("123456");
        userDto.setBirthDate(birthDate);

        assertEquals(10L, userDto.getId());
        assertEquals("Setter Getter", userDto.getName());
        assertEquals(email, userDto.getEmail());
        assertEquals("123456", userDto.getPassword());
        assertEquals(birthDate, userDto.getBirthDate());
    }
}
