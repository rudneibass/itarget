package com.java_services.backend_java.admin.arquivo.repositories;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import com.java_services.backend_java.admin.arquivo.models.Arquivo;

public class ArquivoRepository {

    @Autowired
    public AllRepository AllRepository;

    @Autowired
    public GetByIdRepository GetByIdRepository;

    @Autowired
    public SaveAllRepository SaveAllRepository;

    @Autowired
    public SaveRepository SaveRepository;

    @Autowired
    public UpdateRepository UpdateRepository;

    public List<Arquivo> all(){
        return AllRepository.handle();
    }

    public List<Arquivo> getById(Long id){
        return GetByIdRepository.handle(id);
    }

    public List<Long> saveAll(List<Arquivo> arquivos) {
        return SaveAllRepository.handle(arquivos);
    }

    public Long save(Arquivo arquivo) {
        return SaveRepository.handle(arquivo);
    }   

    public Long update(Arquivo arquivo) {
        return UpdateRepository.handle(arquivo);
    }
}
