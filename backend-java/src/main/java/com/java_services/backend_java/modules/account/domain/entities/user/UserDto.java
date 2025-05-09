package com.java_services.backend_java.modules.account.domain.entities.user;

import com.java_services.backend_java.modules.account.domain.valueObjects.Email;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {
    private Long id;
    private String name;
    private Email email;
    private String password;

    public UserDto(Long id, String name, Email email, String password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
