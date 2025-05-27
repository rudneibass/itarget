package com.java_services.backend_java.account.domain.repositories.passwordResetToken.db;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;

import com.java_services.backend_java.account.domain.interfaces.Database;
import com.java_services.backend_java.account.domain.entities.passwordResetToken.PasswordResetToken;

@SpringBootTest
@Transactional
@ActiveProfiles("test")
public class ReadPasswordResetTokenRepositoryIntegrationTest {

    @Autowired
    private Database database;

    @Autowired
    private EntityManager entityManager;

    @BeforeEach
    public void setUp() {
        entityManager.createNativeQuery("DROP TABLE IF EXISTS password_reset_tokens").executeUpdate();
        entityManager.createNativeQuery(
            "CREATE TABLE password_reset_tokens ("+
            "id serial NOT NULL,"+
            "token VARCHAR(255) PRIMARY KEY,"+
            "user_id BIGINT NOT NULL,"+
            "expiration_time BIGINT NOT NULL)"
        ).executeUpdate();
        entityManager.createNativeQuery("INSERT INTO password_reset_tokens (token, user_id, expiration_time) VALUES ('token123', 1, '101112131415')").executeUpdate();
    }

    @AfterEach
    public void tearDown() {
        entityManager.createNativeQuery("DELETE FROM password_reset_tokens").executeUpdate();
    }

    @Test
    public void shouldReturnsUserWhenTokenExists() {
        ReadPasswordResetTokenRepository
        readPasswordResetTokenRepository = new ReadPasswordResetTokenRepository(database);

        PasswordResetToken passwordResetToken = readPasswordResetTokenRepository.getByToken("token123");
        assertThat(passwordResetToken).isNotNull();
    }

    @Test
    public void shouldReturnsNullWhenTokenDoesNotExist() {
        ReadPasswordResetTokenRepository
        readPasswordResetTokenRepository = new ReadPasswordResetTokenRepository(database);

        PasswordResetToken nonExistingUser = readPasswordResetTokenRepository.getByToken("tokenDoesNotExist");
        assertThat(nonExistingUser).isNull();
    }
}
