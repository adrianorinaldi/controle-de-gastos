package com.controledegastos.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record ReceitaDTOResponse(Long id,
                                 String descricao,
                                 String categoria,
                                 String data,
                                 String conta,
                                 BigDecimal valor) {
}
