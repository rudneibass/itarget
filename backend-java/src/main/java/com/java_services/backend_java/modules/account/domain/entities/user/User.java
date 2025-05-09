package com.java_services.backend_java.modules.account.domain.entities.user;

import com.java_services.backend_java.modules.account.domain.valueObjects.Email;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class User {

    private Long id;
    private String name;
    private Email email;
    private String password;

    public User(UserDto dto) {
        if (dto.getName() == null || dto.getName().trim().isEmpty()) throw new IllegalArgumentException("User name cannot be null or empty.");
        if (dto.getPassword() == null || dto.getPassword().isEmpty()) throw new IllegalArgumentException("User password cannot be null or empty.");
        if (dto.getEmail() == null) throw new IllegalArgumentException("Email cannot be null or empty.");

        this.id = dto.getId() != null ? dto.getId() : null;
        this.name = dto.getName();
        this.email = dto.getEmail();
        this.password = dto.getPassword();
    }

    public void changeName(String newName) {
        if (newName == null || newName.trim().isEmpty()) {
            throw new IllegalArgumentException("New name cannot be null or empty.");
        }
        this.name = newName;
    }

    public void changeEmail(Email newEmail) {
        if (newEmail == null) {
            throw new IllegalArgumentException("New email cannot be null.");
        }
        this.email = newEmail;
    }

    public void changePassword(String newPassword) {
        if (newPassword == null || newPassword.trim().isEmpty()) {
            throw new IllegalArgumentException("New password cannot be null or empty.");
        }
        this.password = newPassword;
    }
}