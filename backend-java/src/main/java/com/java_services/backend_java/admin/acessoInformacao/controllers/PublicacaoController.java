package com.java_services.backend_java.admin.acessoInformacao.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
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

    // HTML: lista com Thymeleaf
    @GetMapping
    public String listar(Model model) {
        model.addAttribute("publicacoes", publicacaoDao.findAll());
        return "admin/acessoInformacao/publicacao/lista"; 
    }

    // HTML: formulário de nova publicação
    @GetMapping("/novo")
    public String criar(Model model) {
        model.addAttribute("publicacao", new Publicacao());
        return "publicacoes/form";
    }

    // HTML: salvar publicação via formulário
    @PostMapping("/salvar")
    public String salvar(@ModelAttribute Publicacao publicacao) {
        publicacaoDao.save(publicacao);
        return "redirect:/publicacoes";
    }

    // JSON: lista para chamada AJAX
    @GetMapping("/api")
    @ResponseBody
    public List<Publicacao> listarJson() {
        return publicacaoDao.findAll(); // Retorna JSON
    }

    // JSON: salvar via AJAX (por exemplo, via fetch ou jQuery)
    @PostMapping("/api")
    @ResponseBody
    public Long salvarJson(@RequestBody Publicacao publicacao) {
        return publicacaoDao.save(publicacao); // Retorna o salvo como JSON
    }
}