package com.java_services.backend_java.admin.acessoInformacao.controllers;

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

import com.java_services.backend_java.admin.acessoInformacao.dao.PublicacaoDao;
import com.java_services.backend_java.admin.acessoInformacao.model.Publicacao;

@Controller
@RequestMapping("/admin/publicacoes")
public class PublicacaoController {

    @Autowired
    private PublicacaoDao publicacaoDao;

    @GetMapping("/list")
    public String list(Model model) {
        return "admin/pages/acessoInformacao/publicacao/list/list"; 
    }

    @GetMapping("/form")
    public String form(Model model) {
        return "admin/pages/acessoInformacao/publicacao/form/form";
    }

    @GetMapping("/listar")
    @ResponseBody
    public List<Publicacao> listarJson() {
        return publicacaoDao.findAll();
    }

    @GetMapping("/id/{id}")
    @ResponseBody
    public Publicacao findById(@PathVariable Long id) {
        return publicacaoDao.findById(id);
    }

    @PostMapping("/salvar")
    @ResponseBody
    public Long salvarJson(@RequestBody Publicacao publicacao) {
        return publicacaoDao.save(publicacao);
    }
}