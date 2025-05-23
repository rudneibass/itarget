package com.java_services.backend_java.account.domain.services.user.login;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginServiceInputData {
    private String email;
    private String password;
}
