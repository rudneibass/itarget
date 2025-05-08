package com.java_services.backend_java.modules.account.infra.controllers.user.register;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")

public class RegisterController {

    @GetMapping("/register")
    public String handler(){
        return "Register an user";
    }
}
