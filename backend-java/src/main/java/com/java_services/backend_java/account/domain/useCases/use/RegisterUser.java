package com.java_services.backend_java.account.domain.useCases.use;

import com.java_services.backend_java.account.domain.entities.user.User;
import com.java_services.backend_java.account.domain.entities.user.UserDto;
import com.java_services.backend_java.account.domain.interfaces.Database;
import com.java_services.backend_java.account.domain.repositories.user.db.UserRepository;

public class RegisterUser {

    private UserRepository userRepository;

    public RegisterUser(Database databaseAdapter) {
        this.userRepository = new UserRepository(databaseAdapter);
    }

    public UserDto execute(UserDto userDto) {
        int id = userRepository.create(new User(userDto));
        User newUser = userRepository.getById(Long.valueOf(id));
        return 
            UserDto.builder()
                .id(newUser.getId())
                .name(newUser.getName())
                .email(newUser.getEmail())
                .password(newUser.getPassword())
                .birthDate(newUser.getBirthDate())
                .build();
    }
}   
