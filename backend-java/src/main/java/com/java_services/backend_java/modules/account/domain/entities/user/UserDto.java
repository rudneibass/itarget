package com.java_services.backend_java.modules.account.domain.entities.user;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

import com.java_services.backend_java.modules.account.domain.value_objects.Email;
@Getter
@Setter
@Builder
public class UserDto {
    private Long id;
    private String name;
    private Email email;
    private String password;
    private LocalDate birthDate;

    public UserDto(Long id, String name, Email email, String password, LocalDate birthDate) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.birthDate = birthDate;
    }
}
