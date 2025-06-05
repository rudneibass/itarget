package com.java_services.backend_java.api.account.domain.repositories.passwordResetToken.db;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import com.java_services.backend_java.api.account.domain.entities.passwordResetToken.PasswordResetToken;
import com.java_services.backend_java.api.account.domain.interfaces.Database;
import com.java_services.backend_java.api.account.domain.repositories.passwordResetToken.db.CreatePasswordResetTokenRepository;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
@ActiveProfiles("test")
public class CreatePasswordResetTokenRepositoryIntegrationTest {

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
    }

    @AfterEach
    public void tearDown() {
        entityManager.createNativeQuery("DELETE FROM password_reset_tokens").executeUpdate();
    }


    @Test
    public void shouldInsertsNewUserSuccessfully() {
        
        CreatePasswordResetTokenRepository 
        createPasswordResetTokenRepository = new CreatePasswordResetTokenRepository(database);
        
        PasswordResetToken 
        passwordResetToken = 
        PasswordResetToken
        .builder()
            .token("token123")
            .userId(3L)
            .expirationTime(System.currentTimeMillis() + 3600000)
            .build();

        Long id = createPasswordResetTokenRepository.create(passwordResetToken);
        assertThat(id).isEqualTo(1L);
    }
}
