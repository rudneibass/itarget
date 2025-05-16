package com.java_services.backend_java.account.infra.controllers.user;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.java_services.backend_java.account.domain.services.user.register.RegisterUserInputData;
import com.java_services.backend_java.account.domain.services.user.register.RegisterUserOutputData;
import com.java_services.backend_java.account.domain.services.user.register.RegisterUserService;

@RestController
@RequestMapping("/api/user")
public class RegisterUserController {

    private final RegisterUserService registerUserService;

    public RegisterUserController(RegisterUserService registerUserService) {
        this.registerUserService = registerUserService;
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterUserOutputData> 
    register(@RequestBody RegisterUserInputData inputData) {
        RegisterUserOutputData 
        createdUser = registerUserService.execute(inputData);
        return ResponseEntity.ok(createdUser);
    }
}
