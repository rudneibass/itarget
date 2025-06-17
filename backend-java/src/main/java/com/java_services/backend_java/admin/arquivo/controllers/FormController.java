package com.java_services.backend_java.admin.arquivo.controllers;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin/arquivo")
public class FormController {

    @GetMapping("/form")
    public String form(Model model) {
        return "admin/pages/arquivo/form/form";
    }
}