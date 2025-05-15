package com.java_services.backend_java.account.infra.controllers.user;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.java_services.backend_java.account.domain.entities.user.UserDto;
import com.java_services.backend_java.account.domain.useCases.use.RegisterUser;
import com.java_services.backend_java.account.infra.adapters.DatabaseAdapter;

@RestController
@RequestMapping("/user")

public class RegisterUserController {

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody UserDto userDto) {
        RegisterUser useCase = new RegisterUser(new DatabaseAdapter());
        UserDto createdUser = useCase.execute(userDto);
        return ResponseEntity.ok(createdUser);
    }
}
