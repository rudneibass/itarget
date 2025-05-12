package com.java_services.backend_java.modules.account.domain.repositories.user;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;


import com.java_services.backend_java.modules.account.domain.interfaces.Database;
import com.java_services.backend_java.modules.account.domain.valueObjects.Email;
import com.java_services.backend_java.modules.account.domain.entities.user.User;
import com.java_services.backend_java.modules.account.domain.entities.user.UserDto;

@SpringBootTest
@Transactional
@ActiveProfiles("test")
public class UserRepositoryTest {

    @Autowired
    private Database database;

    @Autowired
    private EntityManager entityManager;

    @BeforeEach
    public void setUp() {
        entityManager.createNativeQuery("DROP TABLE IF EXISTS users").executeUpdate();
        entityManager.createNativeQuery(
            "CREATE TABLE users (" +
            "id BIGSERIAL PRIMARY KEY, " +
            "name VARCHAR(255), " +
            "email VARCHAR(255), " +
            "password VARCHAR(255))"
        ).executeUpdate();
        entityManager.createNativeQuery("INSERT INTO users (name, email, password) VALUES ('Alice', 'alice@example.com', '123mudar')").executeUpdate();
        entityManager.createNativeQuery("INSERT INTO users (name, email, password) VALUES ('Bob', 'bob@example.com', '123mudar')").executeUpdate();
    }

    @AfterEach
    public void tearDown() {
        entityManager.createNativeQuery("DELETE FROM users").executeUpdate();
    }

    @Test
    public void testFindAllUsers_returnsMappedUserObjects() {
        UserRepository userRepository = new UserRepository(database);
        List<User> users = userRepository.all();

        assertThat(users).isNotNull();
        assertThat(users).hasSize(2);

        User alice = users.get(0);
        assertThat(alice.getName()).isEqualTo("Alice");
        assertThat(alice.getEmail().getAddress()).isEqualTo("alice@example.com".trim());
        assertThat(alice.getPassword()).isEqualTo("123mudar");

        User bob = users.get(1);
        assertThat(bob.getName()).isEqualTo("Bob");
        assertThat(bob.getEmail().getAddress()).isEqualTo("bob@example.com".trim());
        assertThat(bob.getPassword()).isEqualTo("123mudar");
    }

    @Test
    public void testCreateUser_insertsNewUserSuccessfully() {
        UserRepository userRepository = new UserRepository(database);
    
        User newUser = new User(
            UserDto.builder()
                .id(null)
                .name("Charlie")
                .email(new Email("charlie@example.com"))
                .password("senhaSegura123")
                .build()
        );
    
        int rowsAffected = userRepository.create(newUser);
        assertThat(rowsAffected).isEqualTo(1);
    
        List<User> users = userRepository.all();
        assertThat(users).hasSize(3); // 2 do setup + 1 novo
    
        User charlie = users.stream()
            .filter(u -> u.getEmail().getAddress().equals("charlie@example.com"))
            .findFirst()
            .orElse(null);
    
        assertThat(charlie).isNotNull();
        assertThat(charlie.getName()).isEqualTo("Charlie");
        assertThat(charlie.getPassword()).isEqualTo("senhaSegura123");
        assertThat(charlie.getId()).isNotNull();
    }
    
    @Test
    public void testUpdateUser_withBirthDate_updatesUserIncludingBirthDate() {
        UserRepository userRepository = new UserRepository(database);

        List<User> users = userRepository.all();
        User user = users.get(0);

        user.changeName("Bob with Birthdate");
        user.changePassword("novaSenha456");
        user.changeEmail(new Email("bob.birth@example.com"));
       
        System.out.println(user.getId());

        int affectedRows = userRepository.update(user);
        assertThat(affectedRows).isEqualTo(1);

        List<User> updatedUsers = userRepository.all();
        User result = updatedUsers.stream()
            .filter(u -> u.getId().equals(user.getId()))
            .findFirst()
            .orElseThrow();
    
        assertThat(result.getName()).isEqualTo("Bob with Birthdate");
        assertThat(result.getEmail().getAddress()).isEqualTo("bob.birth@example.com");
        assertThat(result.getPassword()).isEqualTo("novaSenha456");
    }
}
