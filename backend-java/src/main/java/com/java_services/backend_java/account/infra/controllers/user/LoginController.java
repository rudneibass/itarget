package com.java_services.backend_java.account.infra.controllers.user;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.java_services.backend_java.account.domain.services.user.login.LoginService;
import com.java_services.backend_java.account.domain.services.user.login.LoginServiceInputData;
import com.java_services.backend_java.account.domain.services.user.login.LoginServiceOutputData;

@RestController
@RequestMapping("/api/account/user")
public class LoginController {
    private final LoginService loginJwtService;

    public LoginController(LoginService loginJwtService) {
        this.loginJwtService = loginJwtService;
    }

    @PostMapping("/login")
    public LoginServiceOutputData login(@RequestBody LoginServiceInputData inputData) {
        return loginJwtService.execute(inputData);
    }

}
