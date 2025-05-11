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

    /* 
    V2
    @Override
    public List<Map<String, Object>> rawQuery(String query, Object... bindings) {
        Query nativeQuery = entityManager.createNativeQuery(query, Tuple.class);
        

        for (int i = 0; i < bindings.length; i++) {
            nativeQuery.setParameter(i + 1, bindings[i]);
        }

        @SuppressWarnings("unchecked")
        List<Tuple> results = nativeQuery.getResultList();

        List<Map<String, Object>> resultList = new ArrayList<>();
        
        for (Tuple tuple : results) {
            Map<String, Object> rowMap = new LinkedHashMap<>();
            for (TupleElement<?> element : tuple.getElements()) {
                rowMap.put(element.getAlias(), tuple.get(element));
            }
            resultList.add(rowMap);
        }
        return resultList;
    }*/

    /* 
    V1
    @Override
    public List<Map<String, Object>> rawQuery(String query, Object... bindings) {
        Query nativeQuery = entityManager.createNativeQuery(query);
        for (int i = 0; i < bindings.length; i++) {
            nativeQuery.setParameter(i + 1, bindings[i]);
        }
        @SuppressWarnings("unchecked")
        List<Object[]> results = nativeQuery.getResultList();
        List<Map<String, Object>> resultList = new ArrayList<>();
        for (Object[] row : results) {
            Map<String, Object> rowMap = new LinkedHashMap<>();
            for (int i = 0; i < row.length; i++) {
                rowMap.put("col" + i, row[i]);
            }
            resultList.add(rowMap);
        }
        return resultList;
    }*/
}