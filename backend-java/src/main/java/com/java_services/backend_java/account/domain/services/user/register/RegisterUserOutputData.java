package com.java_services.backend_java.account.domain.services.user.register;

import java.time.LocalDate;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class RegisterUserOutputData {
    private Long id;
    private String name;
    private String email;
    private LocalDate birthDate;
}
