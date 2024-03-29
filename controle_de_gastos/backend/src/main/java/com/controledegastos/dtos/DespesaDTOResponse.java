package com.controledegastos.dtos;

import java.math.BigDecimal;

public record DespesaDTOResponse(Long id,
                                 String descricao,
                                 String categoria,
                                 String data,
                                 String conta,
                                 BigDecimal valor) {
}
