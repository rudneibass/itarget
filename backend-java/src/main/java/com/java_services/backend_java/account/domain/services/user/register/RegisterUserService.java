package com.java_services.backend_java.account.domain.services.user.register;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.java_services.backend_java.account.domain.entities.user.User;
import com.java_services.backend_java.account.domain.entities.user.UserDto;
import com.java_services.backend_java.account.domain.interfaces.Database;
import com.java_services.backend_java.account.domain.repositories.user.db.UserRepository;
import com.java_services.backend_java.account.domain.valueObjects.Email;

@Service
public class RegisterUserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public RegisterUserService(Database databaseAdapter) {
        this.userRepository = new UserRepository(databaseAdapter);
        this.passwordEncoder = new BCryptPasswordEncoder();
    }
    
    public RegisterUserOutputData execute(RegisterUserInputData inputData) {
        UserDto 
        userDto = 
            UserDto.builder()
            .name(inputData.getName())
            .email(new Email(inputData.getEmail()))
            .password(passwordEncoder.encode(inputData.getPassword()))
            .birthDate(inputData.getBirthDate())
            .build();

        int id = userRepository.create(new User(userDto));
        User newUser = userRepository.getById(Long.valueOf(id));
        
        return 
            RegisterUserOutputData.builder()
                .id(newUser.getId())
                .name(newUser.getName())
                .email(newUser.getEmail().getAddress())
                .birthDate(newUser.getBirthDate())
                .build();
    }
}   
