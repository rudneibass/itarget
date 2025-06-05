package com.java_services.backend_java.api.account.domain.repositories.user.db;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import com.java_services.backend_java.api.account.domain.interfaces.Database;
import com.java_services.backend_java.api.account.domain.repositories.user.db.DeleteUserRepository;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
@ActiveProfiles("test")
public class DeleteUserRepositoryIntegrationTest {

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
    public void testDeleteUser() {
        DeleteUserRepository 
        deleteUserRepository = new DeleteUserRepository(database);
        int 
        affectedRows = deleteUserRepository.delete(1L);
        assertThat(affectedRows).isEqualTo(1);
    }
}
