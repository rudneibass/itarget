package com.java_services.backend_java.auth.domain.services.jwt.login;


import org.springframework.stereotype.Service;

import com.java_services.backend_java.account.domain.entities.user.User;

import com.java_services.backend_java.auth.domain.interfaces.PasswordEncoder;
import com.java_services.backend_java.auth.domain.interfaces.TokenProvider;

import com.java_services.backend_java.account.domain.repositories.user.db.UserRepository;

@Service
public class LoginJwtService {

    private final UserRepository userRepository;
    private final TokenProvider tokenProvider;
    private final PasswordEncoder passwordEncoder;

    public LoginJwtService(UserRepository userRepository, TokenProvider tokenProvider, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.tokenProvider = tokenProvider;
        this.passwordEncoder = passwordEncoder;
    }

    public String execute(String email, String rawPassword){
        User user = userRepository.findByEmail(email);

        if(user == null || !passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new RuntimeException("Invalid credentials, try again.");
        }

        return tokenProvider.generateToken(user.getEmail().getAddress());
    }

}
