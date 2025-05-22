package com.java_services.backend_java.auth.domain.services.jwt.login;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginJwtServiceOutputData {
    private String message;
    private String token;
}
