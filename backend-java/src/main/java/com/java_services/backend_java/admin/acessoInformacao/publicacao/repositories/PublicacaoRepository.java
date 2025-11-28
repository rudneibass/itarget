package com.java_services.backend_java.admin.acessoInformacao.publicacao.repositories;
import com.java_services.backend_java.admin.acessoInformacao.publicacao.models.Publicacao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.List;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;


@Repository
public class PublicacaoRepository {

    private final JdbcTemplate jdbcTemplate;

    public PublicacaoRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Publicacao> mapper = (rs, rowNum) -> {
        Publicacao p = new Publicacao();
        p.setId(rs.getLong("id"));
        p.setTitulo(rs.getString("titulo"));
        p.setTipo(rs.getString("tipo"));
        p.setDataPublicacao(rs.getDate("data_publicacao") != null ? rs.getDate("data_publicacao").toLocalDate() : null);
        p.setDescricao(rs.getString("descricao"));
        p.setNumero(rs.getString("numero"));
        p.setExercicio(rs.getString("exercicio"));
        p.setCompetencia(rs.getString("competencia"));
        return p;
    };

    public List<Publicacao> findAll() {
        String sql = "SELECT * FROM publicacoes ORDER BY id DESC";
        return jdbcTemplate.query(sql, mapper);
    }

    public Publicacao findById(Long id) {
        String sql = "SELECT * FROM publicacoes WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{id}, mapper);
    }

    public Long save(Publicacao p) {

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update((Connection con) -> {
            PreparedStatement ps = 
            con.prepareStatement(
                """
                    INSERT INTO publicacoes (tipo, numero, exercicio, competencia, data_publicacao, titulo, descricao, data_cadastro)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                    RETURNING id
                """, 
                Statement.RETURN_GENERATED_KEYS
            );
            ps.setString(1, p.getTipo());
            ps.setString(2, p.getNumero());
            ps.setString(3, p.getExercicio());
            ps.setString(4, p.getCompetencia());
            ps.setObject(5, p.getDataPublicacao());
            ps.setString(6, p.getTitulo());
            ps.setString(7, p.getDescricao());
            ps.setTimestamp(8, Timestamp.valueOf(java.time.LocalDateTime.now()));
            return ps;
        }, keyHolder);

        return keyHolder.getKey().longValue();
    }

    public Long update(Publicacao p) {
        jdbcTemplate
        .update(
            """
            UPDATE publicacoes
            SET titulo=?, tipo=?, data_publicacao=?, descricao=?, numero=?, exercicio=?, competencia=?
            WHERE id=?
            """,
            p.getTitulo(), 
            p.getTipo(), 
            p.getDataPublicacao(),
            p.getDescricao(), 
            p.getNumero(), 
            p.getExercicio(),
            p.getCompetencia(),
            p.getId()
        );

        return p.getId();
    }

    public Long delete(Long id) {
        String sql = "DELETE FROM publicacoes WHERE id = ?";
        jdbcTemplate.update(sql, id);
        return id;
    }
}
