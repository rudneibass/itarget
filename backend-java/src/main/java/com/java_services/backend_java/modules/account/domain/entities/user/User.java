package com.java_services.backend_java.modules.account.domain.entities.user;

import java.util.Objects;
import java.util.UUID;
import com.java_services.backend_java.modules.account.domain.valueObject.Email;

public class User {

    private long id;
    private String name;
    private Email email;
    private String password;

    public User(Long id, String name, Email email, String password) {
        if (id == null) throw new IllegalArgumentException("User ID cannot be null.");
        if (name == null || name.trim().isEmpty()) throw new IllegalArgumentException("User name cannot be null or empty.");
        if (email == null) throw new IllegalArgumentException("User email cannot be null.");
        if (password == null || password.trim().isEmpty()) throw new IllegalArgumentException("User password cannot be null or empty.");

        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Email getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User)) return false;
        User user = (User) o;
        return id.equals(user.id); // identity-based equality
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}