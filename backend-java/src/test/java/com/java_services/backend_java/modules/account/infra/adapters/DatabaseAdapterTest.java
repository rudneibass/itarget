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
public class DatabaseAdapterTest {

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

    @Test
    void testRawQueryReturnsExpectedResults() {
        List<Map<String, Object>> 
        results = 
        databaseAdapter.rawQuery("SELECT * FROM users");
        assertEquals(2, results.size());
    }

    @Test
    void testExecuteUpdateUpdatesData() {
        String updateSql = "UPDATE users SET name = ? WHERE id = ?";
        int id = databaseAdapter.executeUpdate(updateSql, "Alice Updated", 1);
        assertEquals(1, id);
        List<Map<String, Object>> results = databaseAdapter.rawQuery("SELECT * FROM users WHERE id = 1");
        assertEquals(1, results.size());
        assertEquals("Alice Updated", results.get(0).get("name"));
    }

    @Test
    void testExecuteUpdateInsertsData() {
        String insertSql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        int id = databaseAdapter.executeUpdate(insertSql, "Charlie", "charlie@example.com", "123password");
        assertEquals(3, id);
        List<Map<String, Object>> results = databaseAdapter.rawQuery("SELECT * FROM users WHERE name = 'Charlie'");
        assertEquals(1, results.size());
        assertEquals("Charlie", results.get(0).get("name"));
        assertEquals("charlie@example.com", results.get(0).get("email"));
    }

    @Test
    void testExecuteUpdateDeletesData() {
        String deleteSql = "DELETE FROM users WHERE id = ?";
        int rowsAffected = databaseAdapter.executeUpdate(deleteSql, 2);
        assertEquals(1, rowsAffected);
        List<Map<String, Object>> results = databaseAdapter.rawQuery("SELECT * FROM users WHERE id = 2");
        assertEquals(0, results.size());
    }

}
