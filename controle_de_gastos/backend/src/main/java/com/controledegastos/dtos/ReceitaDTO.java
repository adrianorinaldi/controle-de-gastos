package com.controledegastos.dtos;

import com.controledegastos.entities.Categoria;
import com.controledegastos.entities.Conta;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ReceitaDTO(Long id,
                         @NotBlank String descricao,
                         @NotNull Long categoria,
                         @NotBlank String data,
                         @NotNull Long conta,
                         @NotNull BigDecimal valor) {
}
