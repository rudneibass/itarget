package com.java_services.backend_java.admin.arquivo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.java_services.backend_java.admin.arquivo.models.Arquivo;
import com.java_services.backend_java.admin.arquivo.repositories.ArquivoRepository;

import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class LocalServerUploadService {

    @Autowired
    private ArquivoRepository arquivoRepository;

    private final Path diretorioDestino = Paths.get("uploads");

    public void execute(MultipartFile[] arquivos) throws IOException {
        this.createUploadDir();
        this.uploadAll(arquivos);
        this.saveAll(arquivos);
    }
    
    public void createUploadDir() throws IOException {
        if (!Files.exists(diretorioDestino)) {
            Files.createDirectories(diretorioDestino);
        }
    }

    public void uploadAll(MultipartFile[] arquivos) throws IOException {
        for (MultipartFile arquivo : arquivos) {
            if (!arquivo.isEmpty()) {
                Path destino = diretorioDestino.resolve(arquivo.getOriginalFilename());
                Files.copy(arquivo.getInputStream(), destino, StandardCopyOption.REPLACE_EXISTING);
            }
        }
    }
    
    public List<Long> saveAll(MultipartFile[] arquivos) throws IOException {
        List<Arquivo> listaArquivos = new ArrayList<>();
        for (MultipartFile file : arquivos) {
            Arquivo arquivo = new Arquivo();
            arquivo.setNome(file.getOriginalFilename());
            arquivo.setTipo(file.getContentType());
            arquivo.setTamanho(String.valueOf(file.getSize()));
            arquivo.setCaminhoRelativo("caminho/relativo/" + file.getOriginalFilename());
            arquivo.setCaminhoAbsoluto("/caminho/absoluto/" + file.getOriginalFilename());
            arquivo.setData(LocalDate.now());
            arquivo.setHora(LocalTime.now());
            arquivo.setDominio("localhost");
            arquivo.setCnpj("00000000000191");
            arquivo.setUsuario("admin");
            arquivo.setTabelaPai("LocalServerUpload");
            arquivo.setIdTabelaPai(0);
            arquivo.setLink("http://localhost/uploads/" + file.getOriginalFilename());
            listaArquivos.add(arquivo);
        }
        return arquivoRepository.saveAll(listaArquivos); 
    }


    public void handle(MultipartFile[] arquivos) throws IOException {
        for (MultipartFile arquivo : arquivos) {
            if (!arquivo.isEmpty()) {
                Path destino = diretorioDestino.resolve(arquivo.getOriginalFilename());
                Files.copy(arquivo.getInputStream(), destino, StandardCopyOption.REPLACE_EXISTING);
                if (Files.exists(destino)) {
                    arquivoRepository.save(
                        Arquivo.builder()
                            .tabelaPai("LocalServerUpload")
                            .dominio("localhost")
                            .cnpj("00000000000191") 
                            .usuario("admin") 
                            .idTabelaPai(0)
                            .nome(arquivo.getOriginalFilename())
                            .tipo(arquivo.getContentType())
                            .tamanho(String.valueOf(arquivo.getSize()))
                            .caminhoAbsoluto(destino.toAbsolutePath().toString())
                            .caminhoRelativo(destino.toString())
                            .link(destino.toUri().toString())
                            .data(java.time.LocalDate.now())
                            .hora(java.time.LocalTime.now())
                            .build(
                        )
                    );
                }
            }
        }
    }
}
