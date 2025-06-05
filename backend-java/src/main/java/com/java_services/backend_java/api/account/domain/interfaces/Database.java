package com.java_services.backend_java.api.account.domain.interfaces;

import java.util.List;
import java.util.Map;

public interface Database {
    List<Map<String, Object>> rawQuery(String query, Object... bindings);
    int executeUpdate(String sql, Object... bindings);
    int executeInsert(String sql, Object... bindings);
    int executeDelete(String sql, Object... bindings);
}