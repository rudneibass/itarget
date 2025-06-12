package com.java_services.backend_java.admin.arquivo.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "arquivos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Arquivo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "tabela_pai", nullable = false, length = 200)
    private String tabelaPai;

    @Column(name = "id_tabela_pai", nullable = false)
    private Integer idTabelaPai;

    @Column(columnDefinition = "TEXT")
    private String nome;

    @Column(length = 255)
    private String tipo;

    @Column(length = 255)
    private String tamanho;

    @Column(name = "caminho_absoluto", columnDefinition = "LONGTEXT")
    private String caminhoAbsoluto;

    @Column(name = "caminho_relativo", columnDefinition = "LONGTEXT")
    private String caminhoRelativo;

    @Column(length = 255)
    private String dominio;

    @Column(columnDefinition = "LONGTEXT")
    private String link;

    @Column(length = 255)
    private String cnpj;

    @Column(length = 255)
    private String usuario;

    @Column(nullable = false)
    private LocalDate data;

    private LocalTime hora;
}
