
package com.java_services.backend_java.auth.domain.services.jwt.login;

import com.java_services.backend_java.account.domain.entities.user.User;
import com.java_services.backend_java.account.domain.entities.user.UserDto;
import com.java_services.backend_java.account.domain.repositories.user.db.UserRepository;
import com.java_services.backend_java.auth.domain.interfaces.PasswordEncoder;
import com.java_services.backend_java.auth.domain.interfaces.TokenProvider;
import com.java_services.backend_java.account.domain.valueObjects.Email;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class LoginJwtServiceTest {

    private UserRepository userRepository;
    private TokenProvider tokenProvider;
    private PasswordEncoder passwordEncoder;
    private LoginJwtService loginJwtService;

    @BeforeEach
    void setUp() {
        userRepository = mock(UserRepository.class);
        tokenProvider = mock(TokenProvider.class);
        passwordEncoder = mock(PasswordEncoder.class);

        loginJwtService = new LoginJwtService(userRepository, tokenProvider, passwordEncoder);
    }

    @Test
    void shouldReturnTokenWhenCredentialsAreValid() {
        String email = "test@example.com";
        String rawPassword = "123456";
        String encodedPassword = "encodedPass";
        String expectedToken = "jwt-token";

        UserDto userDto = UserDto.builder()
            .email(new Email(email))
            .password(encodedPassword)
            .name("Test User")
            .build();

        User user = new User(userDto);

        when(userRepository.findByEmail(email)).thenReturn(user);
        when(passwordEncoder.matches(rawPassword, encodedPassword)).thenReturn(true);
        when(tokenProvider.generateToken(email)).thenReturn(expectedToken);

        String token = loginJwtService.execute(email, rawPassword);

        assertEquals(expectedToken, token);
    }

    @Test
    void shouldThrowWhenUserNotFound() {
        String email = "notfound@example.com";
        String rawPassword = "123456";

        when(userRepository.findByEmail(email)).thenReturn(null);

        RuntimeException ex = assertThrows(RuntimeException.class, () -> {
            loginJwtService.execute(email, rawPassword);
        });

        assertEquals("Invalid credentials, try again.", ex.getMessage());
    }

    @Test
    void shouldThrowWhenPasswordDoesNotMatch() {
        String email = "test@example.com";
        String rawPassword = "wrongpass";
        String encodedPassword = "encodedPass";

        UserDto userDto = UserDto.builder()
            .email(new Email(email))
            .password(encodedPassword)
            .name("Test User")
            .build();

        User user = new User(userDto);

        when(userRepository.findByEmail(email)).thenReturn(user);
        when(passwordEncoder.matches(rawPassword, encodedPassword)).thenReturn(false);

        RuntimeException ex = assertThrows(RuntimeException.class, () -> {
            loginJwtService.execute(email, rawPassword);
        });

        assertEquals("Invalid credentials, try again.", ex.getMessage());
    }
}

