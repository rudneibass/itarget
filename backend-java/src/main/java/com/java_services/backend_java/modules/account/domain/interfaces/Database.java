package com.java_services.backend_java.modules.account.domain.interfaces;

import java.util.List;
import java.util.Map;

public interface Database {
    List<Map<String, Object>> rawQuery(String query, Object... bindings);
}