package com.java_services.backend_java.auth.infra.controllers.jwt.login;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.java_services.backend_java.auth.domain.services.jwt.login.LoginJwtService;
import com.java_services.backend_java.auth.domain.services.jwt.login.LoginJwtServiceInputData;
import com.java_services.backend_java.auth.domain.services.jwt.login.LoginJwtServiceOutputData;

@RestController
@RequestMapping("/api/auth")
public class LoginJwtController {
    private final LoginJwtService loginJwtService;

    public LoginJwtController(LoginJwtService loginJwtService) {
        this.loginJwtService = loginJwtService;
    }

    @PostMapping("/login")
    public LoginJwtServiceOutputData login(@RequestBody LoginJwtServiceInputData inputData) {
        return loginJwtService.execute(inputData);
    }

}
