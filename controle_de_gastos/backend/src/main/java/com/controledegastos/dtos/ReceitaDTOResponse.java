package com.controledegastos.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record ReceitaDTOResponse(Long id,
                                 String descricao,
                                 Long idCategoria,
                                 String categoria,
                                 String data,
                                 Long idConta,
                                 String conta,
                                 BigDecimal valor) {
}
