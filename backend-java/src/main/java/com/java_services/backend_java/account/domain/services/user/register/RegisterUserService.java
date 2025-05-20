package com.java_services.backend_java.account.domain.services.user.register;

import org.springframework.stereotype.Service;

import com.java_services.backend_java.account.domain.entities.user.User;
import com.java_services.backend_java.account.domain.entities.user.UserDto;

import com.java_services.backend_java.account.domain.interfaces.Database;
import com.java_services.backend_java.account.domain.interfaces.PasswordEncoder;

import com.java_services.backend_java.account.domain.repositories.user.db.UserRepository;
import com.java_services.backend_java.account.domain.valueObjects.Email;

import com.java_services.backend_java.integrations.services.internal.email.EmailSenderIntegrationService;

@Service
public class RegisterUserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailSenderIntegrationService emailSenderIntegrationService;

    public RegisterUserService(
        Database databaseAdapter, 
        EmailSenderIntegrationService emailSenderIntegrationServiceAdapter, 
        PasswordEncoder passwordEncoder
    ) {
        this.userRepository = new UserRepository(databaseAdapter);
        this.passwordEncoder = passwordEncoder;
        this.emailSenderIntegrationService = emailSenderIntegrationServiceAdapter;
    }
    
    public RegisterUserOutputData execute(RegisterUserInputData inputData) {
        User newUser = createUser(inputData);
        sendWelcomeEmail(newUser);

        return 
        RegisterUserOutputData.builder()
            .id(newUser.getId())
            .name(newUser.getName())
            .email(newUser.getEmail().getAddress())
            .birthDate(newUser.getBirthDate())
            .build();
    }

    private User createUser(RegisterUserInputData inputData) {
        UserDto userDto = UserDto.builder()
            .name(inputData.getName())
            .email(new Email(inputData.getEmail()))
            .password(passwordEncoder.encode(inputData.getPassword()))
            .birthDate(inputData.getBirthDate())
            .build();

        int id = userRepository.create(new User(userDto));
        return userRepository.getById(Long.valueOf(id));
    }

    private void sendWelcomeEmail(User user) {
        String subject = "Bem-vindo(a) à nossa plataforma!";
        String message = String.format(
            "Olá %s,\n\nSeu cadastro foi realizado com sucesso!\n\nSeja bem-vindo(a)!",
            user.getName()
        );

        try {
            emailSenderIntegrationService.sendEmail(user.getEmail().getAddress(), subject, message);
        } catch (Exception e) {
            // TODO: log error
        }
    }
}   
