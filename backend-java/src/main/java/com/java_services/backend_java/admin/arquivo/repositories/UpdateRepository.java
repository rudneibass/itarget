package com.java_services.backend_java.admin.arquivo.repositories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.java_services.backend_java.admin.arquivo.models.Arquivo;

import java.sql.*;

@Repository
public class UpdateRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Long handle(Arquivo arquivo) {
        jdbcTemplate
        .update(
            """
            UPDATE publicacoes
            SET tabela_pai=?, id_tabela_pai=?, nome=?, tipo=?, tamanho=?,
                caminho_absoluto=?, caminho_relativo=?, dominio=?, link=?,
                cnpj=?, usuario=?, data=?, hora=?
            WHERE id=?
            """,
            arquivo.getTabelaPai(),
            arquivo.getIdTabelaPai(),
            arquivo.getNome(),
            arquivo.getTipo(),
            arquivo.getTamanho(),
            arquivo.getCaminhoAbsoluto(),
            arquivo.getCaminhoRelativo(),
            arquivo.getDominio(),
            arquivo.getLink(),
            arquivo.getCnpj(),
            arquivo.getUsuario(),
            Date.valueOf(arquivo.getData()),
            Time.valueOf(arquivo.getHora()),
            arquivo.getId()
        );

        return arquivo.getId();
    }
}
