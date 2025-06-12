package com.java_services.backend_java.admin.arquivo.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;

@Service
public class LocalServerUploadService {

    private final Path diretorioDestino = Paths.get("uploads");

    public LocalServerUploadService() throws IOException {
        if (!Files.exists(diretorioDestino)) {
            Files.createDirectories(diretorioDestino);
        }
    }

    public void handle(MultipartFile[] arquivos) throws IOException {
        for (MultipartFile arquivo : arquivos) {
            if (!arquivo.isEmpty()) {
                Path destino = diretorioDestino.resolve(arquivo.getOriginalFilename());
                Files.copy(arquivo.getInputStream(), destino, StandardCopyOption.REPLACE_EXISTING);
            }
        }
    }
}
