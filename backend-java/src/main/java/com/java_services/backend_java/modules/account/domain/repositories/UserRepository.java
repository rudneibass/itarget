package com.java_services.backend_java.modules.account.domain.repositories;

import com.java_services.backend_java.modules.account.domain.interfaces.Database;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;

@Repository
public class UserRepository {

    private final Database database;

    public UserRepository(Database database) {
        this.database = database;
    }

    public List<Map<String, Object>> buscarFormularios() {
        String sql = "SELECT * FROM forms WHERE active = ?";
        return database.rawQuery(sql, true);
    }
}
