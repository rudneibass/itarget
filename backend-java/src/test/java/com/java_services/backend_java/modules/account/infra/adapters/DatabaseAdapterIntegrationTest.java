package com.java_services.backend_java.modules.account.infra.adapters;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import jakarta.persistence.EntityManager;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class DatabaseAdapterIntegrationTest {

    @Autowired
    private EntityManager entityManager;

    private DatabaseAdapter databaseAdapter;

    @BeforeEach
    void setUp() {
        databaseAdapter = new DatabaseAdapter();
        try {
            var field = DatabaseAdapter.class.getDeclaredField("entityManager");
            field.setAccessible(true);
            field.set(databaseAdapter, entityManager);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        // Inserir dados de teste no banco H2
        // entityManager.createNativeQuery("CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(255))").executeUpdate();
        entityManager.createNativeQuery("INSERT INTO user (id, name, email, password) VALUES (1, 'Alice', 'alice@email', '123mudar'), (2, 'Bob', 'bob@email', '123mudar')").executeUpdate();
    }

    @Test
    void testRawQueryReturnsExpectedResults() {
        String sql = "SELECT id, name FROM user";

        List<Map<String, Object>> results = databaseAdapter.rawQuery(sql);

        assertEquals(2, results.size());
        /* 
        assertEquals(1, results.get(0).get("col0"));
        assertEquals("Alice", results.get(0).get("col1"));
        assertEquals(2, results.get(1).get("col0"));
        assertEquals("Bob", results.get(1).get("col1"));
        */
    }
}