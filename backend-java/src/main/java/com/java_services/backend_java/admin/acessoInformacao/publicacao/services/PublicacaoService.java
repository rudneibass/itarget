package com.java_services.backend_java.admin.acessoInformacao.publicacao.services;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

import com.java_services.backend_java.admin.acessoInformacao.publicacao.repositories.PublicacaoRepository;
import com.java_services.backend_java.admin.acessoInformacao.publicacao.models.Publicacao;

@Service
public class PublicacaoService {

    @Autowired
    private PublicacaoRepository publicacaoRepository;

    public List<Publicacao> findAll() {
        return publicacaoRepository.findAll();
    }

    public Publicacao findById(Long id) {
        return publicacaoRepository.findById(id);
    }

    public Long save(Publicacao publicacao) {
        if(publicacao.getId() == null) {
            return publicacaoRepository.save(publicacao);    
        }
        
        return publicacaoRepository.update(publicacao);
    }

    public Long delete(Long id) {
        return publicacaoRepository.delete(id);
    }
}