package com.java_services.backend_java.modules.account.domain.entities.user;


import org.junit.jupiter.api.Test;

import com.java_services.backend_java.modules.account.domain.valueObjects.Email;

import static org.junit.jupiter.api.Assertions.*;

public class UserDtoTest {

    @Test
    public void testUserDtoConstructorAndGetters() {
        long id = 1L;
        String name = "João da Silva";
        Email email = new Email("joao@example.com");
        String password = "senhaSegura123";

        UserDto userDto = new UserDto(id, name, email, password);

        assertEquals(id, userDto.getId());
        assertEquals(name, userDto.getName());
        assertEquals(email, userDto.getEmail());
        assertEquals(password, userDto.getPassword());
    }
}
