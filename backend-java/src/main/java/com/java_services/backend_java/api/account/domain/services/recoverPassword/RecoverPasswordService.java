package com.java_services.backend_java.api.account.domain.services.recoverPassword;

import org.springframework.stereotype.Service;

import com.java_services.backend_java.api.account.domain.entities.passwordResetToken.PasswordResetToken;
import com.java_services.backend_java.api.account.domain.entities.user.User;
import com.java_services.backend_java.api.account.domain.interfaces.Database;
import com.java_services.backend_java.api.account.domain.interfaces.EmailSender;
import com.java_services.backend_java.api.account.domain.repositories.passwordResetToken.db.PasswordResetTokenRepository;
import com.java_services.backend_java.api.account.domain.repositories.user.db.UserRepository;

import java.util.UUID;

@Service
public class RecoverPasswordService {

    private final PasswordResetTokenRepository passwordResetTokentokenRepository;
    private final UserRepository userRepository;
    private final EmailSender emailSender;

    public RecoverPasswordService(
        Database databaseAdapter, 
        EmailSender emailSenderAdapter
    ) {
        this.userRepository = new UserRepository(databaseAdapter);
        this.passwordResetTokentokenRepository = new PasswordResetTokenRepository(databaseAdapter);
        this.emailSender = emailSenderAdapter;
    }
    
    public RecoverPasswordServiceOutputData 
    execute(RecoverPasswordServiceInputData inputData) {
        User user = userRepository.findByEmail(inputData.getEmail());
        if (user == null) {
            throw new IllegalArgumentException("E-mail não encontrado.");
        }

        String token = UUID.randomUUID().toString();

        passwordResetTokentokenRepository.create(
            PasswordResetToken.builder()
                .token(token)
                .userId(user.getId())
                .expirationTime(System.currentTimeMillis() + 3600_000)
                .build()
        );

        try {
            emailSender.setToAddress(user.getEmail().getAddress());
            emailSender.setSubject("Recuperação de senha");
            emailSender.setBody(String.format(
                "Olá %s,\n\n\"Clique no link para redefinir sua senha: %s\n\n"
                ,user.getName()
                ,"https://seusite.com/reset-password?id="+user.getId()+"&token=" + token
            ));
            emailSender.sendEmail();
        } catch (Exception e) {
            // TODO: log error
        }

        return new RecoverPasswordServiceOutputData("Operação realizada com sucesso. O usuario recebera um email com um link de recuperação de senha caso o endereço e-mail fornecido estiver cadastrado em nosso sistema.");
    }
}