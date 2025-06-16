package com.java_services.backend_java.admin.arquivo.mappers;

import org.springframework.jdbc.core.RowMapper;
import com.java_services.backend_java.admin.arquivo.models.Arquivo;

public class ArquivoRowMapper {

    public static final RowMapper<Arquivo> MAPPER = (resultSet, rowNum) -> {
        Arquivo arquivo = new Arquivo();
        arquivo.setId(resultSet.getLong("id"));
        arquivo.setTabelaPai(resultSet.getString("tabela_pai"));
        arquivo.setIdTabelaPai(resultSet.getInt("id_tabela_pai"));
        arquivo.setNome(resultSet.getString("nome"));
        arquivo.setTamanho(resultSet.getString("tamanho"));
        arquivo.setCaminhoAbsoluto(resultSet.getString("caminho_absoluto"));
        arquivo.setCaminhoRelativo(resultSet.getString("caminho_relativo"));
        arquivo.setDominio(resultSet.getString("dominio"));
        arquivo.setLink(resultSet.getString("link"));
        arquivo.setCnpj(resultSet.getString("cnpj"));
        arquivo.setUsuario(resultSet.getString("usuario"));
        arquivo.setData(resultSet.getDate("data") != null ? resultSet.getDate("data").toLocalDate() : null);
        arquivo.setHora(resultSet.getTime("hora") != null ? resultSet.getTime("hora").toLocalTime() : null);
        return arquivo;
    };
}
