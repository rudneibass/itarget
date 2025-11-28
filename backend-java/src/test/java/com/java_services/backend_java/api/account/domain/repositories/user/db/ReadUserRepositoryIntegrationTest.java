package com.java_services.backend_java.api.account.domain.repositories.user.db;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import com.java_services.backend_java.api.account.domain.entities.user.User;
import com.java_services.backend_java.api.account.domain.interfaces.Database;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
@ActiveProfiles("test")
public class ReadUserRepositoryIntegrationTest {

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
        ReadUserRepository readUserRepository = new ReadUserRepository(database);
        List<User> users = readUserRepository.all();

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
    public void testGetById_returnsUserWhenIdExists() {
        ReadUserRepository 
        readUserRepository = new ReadUserRepository(database);

        User 
        retrievedUser = readUserRepository.getById(2L);

        assertThat(retrievedUser).isNotNull();
        assertThat(retrievedUser.getId()).isEqualTo(2L);
        assertThat(retrievedUser.getName()).isEqualTo("Bob");
        assertThat(retrievedUser.getEmail().getAddress()).isEqualTo("bob@example.com");
        assertThat(retrievedUser.getPassword()).isEqualTo("123mudar");
    }

    @Test
    public void testGetById_returnsNullWhenIdDoesNotExist() {
        ReadUserRepository 
        readUserRepository = new ReadUserRepository(database);

        User 
        nonExistingUser = readUserRepository.getById(9999L);
        assertThat(nonExistingUser).isNull();
    }
}
