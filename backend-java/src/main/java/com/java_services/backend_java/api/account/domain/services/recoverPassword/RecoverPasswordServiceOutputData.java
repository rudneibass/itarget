package com.java_services.backend_java.api.account.domain.services.recoverPassword;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecoverPasswordServiceOutputData {
    private String message;

    public RecoverPasswordServiceOutputData(String message) {
        this.message = message;
    }
}