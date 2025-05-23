package com.java_services.backend_java.account.domain.services.user.login;

import org.springframework.stereotype.Service;
import com.java_services.backend_java.account.domain.entities.user.User;
import com.java_services.backend_java.account.domain.interfaces.PasswordEncoder;
import com.java_services.backend_java.account.domain.interfaces.TokenProvider;
import com.java_services.backend_java.account.domain.repositories.user.db.UserRepository;

@Service
public class LoginService {

    private final UserRepository userRepository;
    private final TokenProvider tokenProvider;
    private final PasswordEncoder passwordEncoder;

    public LoginService(UserRepository userRepository, TokenProvider tokenProvider, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.tokenProvider = tokenProvider;
        this.passwordEncoder = passwordEncoder;
    }

    public LoginServiceOutputData execute(LoginServiceInputData inputData) {
        User user = userRepository.findByEmail(inputData.getEmail());

        if(user == null) {
            throw new RuntimeException("Invalid credentials, try again.");
        }

        if(!passwordEncoder.matches(inputData.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials, try again.");
        }

        LoginServiceOutputData 
        outputData = new LoginServiceOutputData();
        outputData.setMessage("Login successful");
        outputData.setToken(tokenProvider.generateToken(user.getEmail().getAddress()));
        
        return outputData;
    }

}
