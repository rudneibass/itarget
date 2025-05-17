package com.java_services.backend_java.account.domain.repositories.user.db;

import com.java_services.backend_java.account.domain.interfaces.Database;
import com.java_services.backend_java.account.domain.entities.user.User;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class UserRepository {

    private final CreateUserRepository createRepo;
    private final UpdateUserRepository updateRepo;
    private final DeleteUserRepository deleteRepo;
    private final ReadUserRepository readRepo;

    public UserRepository(Database database) {
        this.createRepo = new CreateUserRepository(database);
        this.updateRepo = new UpdateUserRepository(database);
        this.deleteRepo = new DeleteUserRepository(database);
        this.readRepo = new ReadUserRepository(database);
    }

    public int create(User user) {
        return createRepo.create(user);
    }

    public int update(User user) {
        return updateRepo.update(user);
    }

    public int delete(Long id) {
        return deleteRepo.delete(id);
    }

    public List<User> all() {
        return readRepo.all();
    }

    public User getById(Long id) {
        return readRepo.getById(id);
    }

    public User findByEmail(String email) {
        return readRepo.findByEmail(email);
    }
}
