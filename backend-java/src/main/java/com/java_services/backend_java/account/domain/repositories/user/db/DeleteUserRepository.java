package com.java_services.backend_java.account.domain.repositories.user.db;

import com.java_services.backend_java.account.domain.interfaces.Database;
import org.springframework.stereotype.Repository;

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
