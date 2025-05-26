package com.java_services.backend_java.account.domain.repositories.passwordResetToken.db;

import org.springframework.stereotype.Repository;
import com.java_services.backend_java.account.domain.entities.passwordResetToken.PasswordResetToken;
import com.java_services.backend_java.account.domain.interfaces.Database;

@Repository
public class PasswordResetTokenRepository {

    private final CreatePasswordResetTokenRepository createRepo;
    private final DeletePasswordResetTokenRepository deleteRepo;
    private final ReadPasswordResetTokenRepository readRepo;
    public PasswordResetTokenRepository(Database database) {
        this.createRepo = new CreatePasswordResetTokenRepository(database);
        this.deleteRepo = new DeletePasswordResetTokenRepository(database);
        this.readRepo = new ReadPasswordResetTokenRepository(database);
    }

    public Long create(PasswordResetToken token) {
        return createRepo.create(token);
    }

    public PasswordResetToken getByToken(String token) {
        return readRepo.getByToken(token); 
    }
    
    public int delete(PasswordResetToken token) {
        return deleteRepo.delete(token.getToken());
    }  
}
