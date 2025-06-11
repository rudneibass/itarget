package com.java_services.backend_java.admin.acessoInformacao.publicacao.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.java_services.backend_java.admin.acessoInformacao.publicacao.models.Publicacao;
import com.java_services.backend_java.admin.acessoInformacao.publicacao.services.PublicacaoService;

@Controller
@RequestMapping("/admin/publicacoes")
public class PublicacaoController {

    @Autowired
    private PublicacaoService publicacaoService;

    @GetMapping("/list")
    public String list(Model model) {
        return "admin/pages/acessoInformacao/publicacao/list/list"; 
    }

    @GetMapping("/form")
    public String form(Model model) {
        return "admin/pages/acessoInformacao/publicacao/form/form";
    }

    @GetMapping("/all")
    @ResponseBody
    public List<Publicacao> findAll() {
        return publicacaoService.findAll();
    }

    @GetMapping("/id/{id}")
    @ResponseBody
    public Publicacao findById(@PathVariable Long id) {
        return publicacaoService.findById(id);
    }

    @PostMapping("/save")
    @ResponseBody
    public Long save(@RequestBody Publicacao publicacao) {
        return publicacaoService.save(publicacao);
    }
}