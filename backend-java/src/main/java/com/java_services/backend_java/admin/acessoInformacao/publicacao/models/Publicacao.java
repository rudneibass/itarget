package com.java_services.backend_java.admin.acessoInformacao.publicacao.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "publicacoes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Publicacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Título é obrigatório")
    private String titulo;

    @NotBlank(message = "Tipo é obrigatório")
    private String tipo;

    @NotNull(message = "Data da publicação é obrigatória")
    @Column(name = "data_publicacao")
    private LocalDate dataPublicacao;

    @Column(name = "data_cadastro")
    private LocalDateTime dataCadastro;

    private String descricao;

    private String numero;

    private String exercicio;

    private String competencia;
}
