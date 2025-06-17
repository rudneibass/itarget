package com.java_services.backend_java.admin.arquivo.repositories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import com.java_services.backend_java.admin.arquivo.models.Arquivo;

import java.sql.*;

@Repository
public class SaveRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Long handle(Arquivo arquivo) {
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update((Connection con) -> {
            PreparedStatement ps = 
            con.prepareStatement(
                """
                    INSERT INTO arquivos (tabela_pai, id_tabela_pai, nome, tipo, tamanho, caminho_absoluto, caminho_relativo, dominio, link, cnpj, usuario, data, hora)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) 
                    RETURNING id
                """, 
                Statement.RETURN_GENERATED_KEYS
            );
            ps.setString(1, arquivo.getTabelaPai());
            ps.setInt(2, arquivo.getIdTabelaPai());
            ps.setString(3, arquivo.getNome());
            ps.setString(4, arquivo.getTipo());
            ps.setString(5, arquivo.getTamanho());
            ps.setString(6, arquivo.getCaminhoAbsoluto());
            ps.setString(7, arquivo.getCaminhoRelativo());
            ps.setString(8, arquivo.getDominio());
            ps.setString(9, arquivo.getLink());
            ps.setString(10, arquivo.getCnpj());
            ps.setString(11, arquivo.getUsuario());
            ps.setDate(12, Date.valueOf(arquivo.getData()));
            ps.setTime(13, Time.valueOf(arquivo.getHora()));
            return ps;
        }, keyHolder);

        return keyHolder.getKey().longValue();
    }
}
