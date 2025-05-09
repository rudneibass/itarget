package com.java_services.backend_java.modules.account.infra.adapters;

import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class DatabaseAdapterIntegrationTest {

    @Autowired
    private EntityManager entityManager;

    private DatabaseAdapter databaseAdapter;

    @BeforeEach
    void setUp() throws Exception {
        databaseAdapter = new DatabaseAdapter();

        var field = DatabaseAdapter.class.getDeclaredField("entityManager");
        field.setAccessible(true);
        field.set(databaseAdapter, entityManager);

        entityManager.createNativeQuery("DROP TABLE IF EXISTS users").executeUpdate();
        entityManager.createNativeQuery("CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(255))").executeUpdate();
        entityManager.createNativeQuery("INSERT INTO users (id, name) VALUES (1, 'Alice'), (2, 'Bob')").executeUpdate();
    }

    @Test
    void testRawQueryReturnsExpectedResults() {
        List<Map<String, Object>> results = databaseAdapter.rawQuery("SELECT * FROM users");
        assertEquals(2, results.size());
    }
}
