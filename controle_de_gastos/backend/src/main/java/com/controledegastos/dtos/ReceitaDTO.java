package com.controledegastos.dtos;

import com.controledegastos.entities.Categoria;
import com.controledegastos.entities.Conta;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;

public record ReceitaDTO(@NotBlank String descricao,
                         @NotBlank Categoria categoria,
                         @NotBlank LocalDateTime data,
                         @NotBlank Conta conta) {
}
