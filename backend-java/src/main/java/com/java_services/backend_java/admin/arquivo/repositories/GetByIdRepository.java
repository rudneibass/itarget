package com.java_services.backend_java.admin.arquivo.repositories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;
import com.java_services.backend_java.admin.arquivo.mappers.ArquivoRowMapper;
import com.java_services.backend_java.admin.arquivo.models.Arquivo;

import java.util.List;

@Transactional
public class GetByIdRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Arquivo> handle(Long id){
        String sql = "SELECT * FROM arquivos WHERE id = ?";
        return jdbcTemplate.query(sql, new Object[]{id}, ArquivoRowMapper.MAPPER);
    }
}
