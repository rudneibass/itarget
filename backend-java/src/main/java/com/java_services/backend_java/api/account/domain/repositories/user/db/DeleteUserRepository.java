package com.java_services.backend_java.api.account.domain.repositories.user.db;

import org.springframework.stereotype.Repository;

import com.java_services.backend_java.api.account.domain.interfaces.Database;

@Repository
public class DeleteUserRepository {

    private final Database database;

    public DeleteUserRepository(Database database) {
        this.database = database;
    }

    public int delete(Long id) {
        if (id == null || id <= 0) {
            throw new IllegalArgumentException("O ID do usuário é obrigatório e deve ser maior que zero.");
        }
        return database.executeUpdate("DELETE FROM users WHERE id = ?", id);
    }
}
