package com.java_services.backend_java.api.account.domain.services.user.register;

import java.time.LocalDate;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class RegisterUserInputData {
    private String name;
    private String email;
    private String password;
    private LocalDate birthDate;
}
