package com.java_services.backend_java.admin.arquivo.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.java_services.backend_java.admin.arquivo.services.LocalServerUploadService;


@Controller
@RequestMapping("/admin/arquivo")
public class ArquivoController {

    @Autowired
    private LocalServerUploadService localServerUploadService;

    @GetMapping("/form")
    public String form(Model model) {
        return "admin/pages/arquivo/form/form";
    }

    @PostMapping("/upload-local-server")
    @ResponseBody
    public ResponseEntity<String> uploadArquivos(@RequestParam("arquivos[]") MultipartFile[] arquivos) {
        try {
            localServerUploadService.handle(arquivos);
            return ResponseEntity.ok("Arquivos enviados com sucesso.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao salvar arquivos: " + e.getMessage());
        }
    }
}