package com.java_services.backend_java.admin.arquivo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.java_services.backend_java.admin.arquivo.models.Arquivo;
import com.java_services.backend_java.admin.arquivo.repositories.ArquivoRepository;

@Service
public class SaveService {

    @Autowired
    private ArquivoRepository arquivoRepository;

    public Long save(Arquivo arquivo) {
        return arquivoRepository.save(arquivo);
    }
}
