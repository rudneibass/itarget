package com.java_services.backend_java.api.account.infra.controllers.db;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/account")
public class HealthController {

    private final EntityManager entityManager;

    @Autowired
    public HealthController(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @GetMapping("/db")
    public String checkDatabaseConnection() {
        try {
            // Tentando executar um simples SELECT para verificar a conexão
            Query q = entityManager.createNativeQuery("SELECT 1");
            q.getSingleResult();
            return "✅ Conexão com o banco de dados estabelecida com sucesso.";
        } catch (Exception e) {
            return "❌ Falha ao conectar com o banco de dados: " + e.getMessage();
        }
    }
}