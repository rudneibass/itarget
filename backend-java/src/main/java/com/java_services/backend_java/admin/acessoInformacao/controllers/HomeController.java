package com.java_services.backend_java.admin.acessoInformacao.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/admin")
    public String admin() {
        return "admin/index"; 
    }
}