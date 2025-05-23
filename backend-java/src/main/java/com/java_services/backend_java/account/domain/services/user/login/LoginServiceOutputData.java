package com.java_services.backend_java.account.domain.services.user.login;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginServiceOutputData {
    private String message;
    private String token;
}
