package com.java_services.backend_java.modules.account.infra.adapters;
import com.java_services.backend_java.modules.account.domain.interfaces.Database;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.persistence.TupleElement;
import jakarta.persistence.Tuple;

import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

@Component
public class DatabaseAdapter implements Database {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Map<String, Object>> rawQuery(String query, Object... bindings) {
        Query nativeQuery = entityManager.createNativeQuery(query, Tuple.class);
    
        for (int i = 0; i < bindings.length; i++) {
            nativeQuery.setParameter(i + 1, bindings[i]);
        }
    
        @SuppressWarnings("unchecked")
        List<Tuple> results = nativeQuery.getResultList();
    
        return results.stream()
            .map(tuple -> {
                Map<String, Object> 
                rowMap = new LinkedHashMap<>();
                for (TupleElement<?> element : tuple.getElements()) {
                    rowMap.put(element.getAlias(), tuple.get(element));
                }
                return rowMap;
            })
            .collect(Collectors.toList());
    }

    @Override
    public int executeUpdate(String sql, Object... bindings) {
        Query query = entityManager.createNativeQuery(sql);
        
        for (int i = 0; i < bindings.length; i++) {
            query.setParameter(i + 1, bindings[i]);
        }

        if (sql.toUpperCase().startsWith("INSERT")) {
            String sqlWithReturning = sql + " RETURNING id";
            Query returningQuery = entityManager.createNativeQuery(sqlWithReturning);
            for (int i = 0; i < bindings.length; i++) {
                returningQuery.setParameter(i + 1, bindings[i]);
            }
            List<Object> resultList = returningQuery.getResultList();
            if (!resultList.isEmpty()) {
                Number generatedId = (Number) resultList.get(0);
                return generatedId.intValue();
            }
        }
        
        return query.executeUpdate();
    }

}