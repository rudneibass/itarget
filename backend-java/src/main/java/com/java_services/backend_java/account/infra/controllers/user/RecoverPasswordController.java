package com.java_services.backend_java.account.infra.controllers.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.java_services.backend_java.account.domain.services.recoverPassword.RecoverPasswordService;
import com.java_services.backend_java.account.domain.services.recoverPassword.RecoverPasswordServiceInputData;
import com.java_services.backend_java.account.domain.services.recoverPassword.RecoverPasswordServiceOutputData;

@Controller
@RequestMapping("/api/account/user")
public class RecoverPasswordController {
    
    @Autowired
    private RecoverPasswordService recoverPasswordService; 

    @PostMapping("/recover-password")
    @ResponseBody
    public ResponseEntity<RecoverPasswordServiceOutputData> 
    sendRecoverPasswordEmail(@RequestBody RecoverPasswordServiceInputData inputData) {
        return ResponseEntity.ok(recoverPasswordService.execute(inputData));
    }
}
