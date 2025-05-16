package com.java_services.backend_java.account.infra.adapters;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class DatabaseJdbcAdapterTest {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    private DatabaseJdbcAdapter databaseAdapter;

    @BeforeEach
    void setUp() {
        databaseAdapter = new DatabaseJdbcAdapter(jdbcTemplate);

        jdbcTemplate.execute("DROP TABLE IF EXISTS users");
        jdbcTemplate.execute(
            "CREATE TABLE users (" +
            "id SERIAL PRIMARY KEY, " +
            "name VARCHAR(255), " +
            "email VARCHAR(255), " +
            "password VARCHAR(255))"
        );
        jdbcTemplate.update("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", "Alice", "alice@example.com", "123mudar");
        jdbcTemplate.update("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", "Bob", "bob@example.com", "123mudar");
    }

    @Test
    void testRawQueryReturnsExpectedResults() {
        List<Map<String, Object>> results = databaseAdapter.rawQuery("SELECT * FROM users");
        assertEquals(2, results.size());
    }

    @Test
    void testExecuteUpdateUpdatesData() {
        String updateSql = "UPDATE users SET name = ? WHERE id = ?";
        int rowsAffected = databaseAdapter.executeUpdate(updateSql, "Alice Updated", 1);
        assertEquals(1, rowsAffected);

        List<Map<String, Object>> results = databaseAdapter.rawQuery("SELECT * FROM users WHERE id = 1");
        assertEquals(1, results.size());
        assertEquals("Alice Updated", results.get(0).get("name"));
    }

    @Test
    void testExecuteInsertData() {
        String insertSql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        int id = databaseAdapter.executeInsert(insertSql, "Charlie", "charlie@example.com", "123password");
        assertEquals(3, id); // id esperado é 3, pois já existem dois registros

        List<Map<String, Object>> results = databaseAdapter.rawQuery("SELECT * FROM users WHERE id = 3");
        assertEquals(1, results.size());
        assertEquals("Charlie", results.get(0).get("name"));
        assertEquals("charlie@example.com", results.get(0).get("email"));
    }

    @Test
    void testExecuteDeletesData() {
        String deleteSql = "DELETE FROM users WHERE id = ?";
        int rowsAffected = databaseAdapter.executeDelete(deleteSql, 2);
        assertEquals(1, rowsAffected);

        List<Map<String, Object>> results = databaseAdapter.rawQuery("SELECT * FROM users WHERE id = 2");
        assertEquals(0, results.size());
    }
}