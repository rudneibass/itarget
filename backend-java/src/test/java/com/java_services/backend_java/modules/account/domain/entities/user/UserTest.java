package com.java_services.backend_java.modules.account.domain.entities.user;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class UserTest {

    @Test
    void testUserCreationWithId() {
        User user = new User(1L, "João", "joao@email.com", "123456", null);

        assertEquals(1L, user.getId());
        assertEquals("João", user.getName());
        assertEquals("joao@email.com", user.getEmail());
        assertEquals("123456", user.getPassword());
    }

    @Test
    void testUserCreationWithoutId() {
        User user = new User("Maria", "maria@email.com", "abcdef");

        assertNull(user.getId());
        assertEquals("Maria", user.getName());
        assertEquals("maria@email.com", user.getEmail());
        assertEquals("abcdef", user.getPassword());
    }

    @Test
    void testRenameValid() {
        User user = new User("Carlos", "carlos@email.com", "senha123");
        user.rename("Carlos Silva");

        assertEquals("Carlos Silva", user.getName());
    }

    @Test
    void testRenameInvalid() {
        User user = new User("Carlos", "carlos@email.com", "senha123");

        assertThrows(IllegalArgumentException.class, () -> user.rename(""));
        assertThrows(IllegalArgumentException.class, () -> user.rename(null));
    }

    @Test
    void testChangeEmailValid() {
        User user = new User("Ana", "ana@email.com", "senha456");
        user.changeEmail("nova@email.com");

        assertEquals("nova@email.com", user.getEmail());
    }

    @Test
    void testChangeEmailInvalid() {
        User user = new User("Ana", "ana@email.com", "senha456");

        assertThrows(IllegalArgumentException.class, () -> user.changeEmail("invalido"));
        assertThrows(IllegalArgumentException.class, () -> user.changeEmail(null));
    }

    @Test
    void testChangePasswordValid() {
        User user = new User("Pedro", "pedro@email.com", "senha789");
        user.changePassword("novasenha");

        assertEquals("novasenha", user.getPassword());
    }

    @Test
    void testChangePasswordInvalid() {
        User user = new User("Pedro", "pedro@email.com", "senha789");

        assertThrows(IllegalArgumentException.class, () -> user.changePassword("123"));
        assertThrows(IllegalArgumentException.class, () -> user.changePassword(null));
    }

    @Test
    void testEqualsAndHashCode() {
        User u1 = new User(1L, "A", "a@email.com", "123456", null);
        User u2 = new User(1L, "B", "b@email.com", "abcdef", null);
        User u3 = new User(2L, "C", "c@email.com", "zzzzzz", null);

        assertEquals(u1, u2); // mesmo ID
        assertNotEquals(u1, u3); // IDs diferentes

        assertEquals(u1.hashCode(), u2.hashCode());
        assertNotEquals(u1.hashCode(), u3.hashCode());
    }
}
