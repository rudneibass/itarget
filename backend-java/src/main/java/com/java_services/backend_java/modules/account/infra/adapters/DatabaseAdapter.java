package com.java_services.backend_java.modules.account.infra.adapters;
import com.java_services.backend_java.modules.account.domain.interfaces.Database;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class DatabaseAdapter implements Database {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Map<String, Object>> rawQuery(String query, Object... bindings) {
        Query nativeQuery = entityManager.createNativeQuery(query);

        for (int i = 0; i < bindings.length; i++) {
            nativeQuery.setParameter(i + 1, bindings[i]);
        }

        @SuppressWarnings("unchecked")
        List<Object[]> results = nativeQuery.getResultList();

        List<Map<String, Object>> resultList = new ArrayList<>();

        List<String> columnNames = nativeQuery.getResultList().isEmpty()
            ? Collections.emptyList()
            : entityManager.getEntityManagerFactory()
                .getPersistenceUnitUtil()
                .getIdentifier(results.get(0))
                .toString().lines().toList();

        for (Object rowObj : results) {
            Object[] row = (Object[]) rowObj;
            Map<String, Object> rowMap = new LinkedHashMap<>();
            for (int i = 0; i < row.length; i++) {
                rowMap.put("col" + i, row[i]); // sem nome real da coluna
            }
            resultList.add(rowMap);
        }

        return resultList;
    }
}