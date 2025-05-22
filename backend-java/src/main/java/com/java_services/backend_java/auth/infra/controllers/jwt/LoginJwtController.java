package com.java_services.backend_java.auth.infra.controllers.jwt;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.java_services.backend_java.auth.domain.services.jwt.login.LoginJwtService;

@RestController
@RequestMapping("/api/auth")
public class LoginJwtController {
    private final LoginJwtService loginJwtService;

    public LoginJwtController(LoginJwtService loginJwtService) {
        this.loginJwtService = loginJwtService;
    }

    @PostMapping("/login")
    public String login(@RequestParam String email,@RequestParam String password) {
        return loginJwtService.execute(email, password);
    }

}
