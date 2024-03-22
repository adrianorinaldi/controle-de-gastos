package com.controledegastos.dtos;

import jakarta.validation.constraints.NotBlank;

public record ContaDTO(Long id,
                       @NotBlank String descricao) {
}
