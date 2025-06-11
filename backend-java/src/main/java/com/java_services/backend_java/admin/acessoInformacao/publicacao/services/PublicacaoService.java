package com.java_services.backend_java.admin.acessoInformacao.publicacao.services;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

import com.java_services.backend_java.admin.acessoInformacao.publicacao.daos.PublicacaoDao;
import com.java_services.backend_java.admin.acessoInformacao.publicacao.models.Publicacao;

@Service
public class PublicacaoService {

    @Autowired
    private PublicacaoDao publicacaoDao;

    public List<Publicacao> findAll() {
        return publicacaoDao.findAll();
    }

    public Publicacao findById(Long id) {
        return publicacaoDao.findById(id);
    }

    public Long save(Publicacao publicacao) {
        if(publicacao.getId() == null) {
            publicacao.setDataCadastro(java.time.LocalDateTime.now());
            return publicacaoDao.save(publicacao);    
        }
        
        return publicacaoDao.update(publicacao);
    }

    public Long delete(Long id) {
        return publicacaoDao.delete(id);
    }
}