package com.java_services.backend_java.api.account.infra.adapters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.*;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Component;

import com.java_services.backend_java.api.account.domain.interfaces.Database;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.*;

@Component
public class DatabaseJdbcAdapter implements Database {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public DatabaseJdbcAdapter(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    
    @Override
    public List<Map<String, Object>> rawQuery(String sql, Object... bindings) {
        return jdbcTemplate.query(
            sql,
            ps -> {
                for (int i = 0; i < bindings.length; i++) {
                    ps.setObject(i + 1, bindings[i]);
                }
            },
            new ColumnMapRowMapper()
        );
    }

    @Override
    public int executeUpdate(String sql, Object... bindings) {
        return jdbcTemplate.update(sql, bindings);
    }

    @Override
    public int executeInsert(String sql, Object... bindings) {
        // Assumindo PostgreSQL com "RETURNING id"
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql + " RETURNING id", Statement.RETURN_GENERATED_KEYS);
            for (int i = 0; i < bindings.length; i++) {
                ps.setObject(i + 1, bindings[i]);
            }
            return ps;
        }, keyHolder);

        Number key = keyHolder.getKey();
        return key != null ? key.intValue() : -1;
    }

    @Override
    public int executeDelete(String sql, Object... bindings) {
        return jdbcTemplate.update(sql, bindings);
    }
}
