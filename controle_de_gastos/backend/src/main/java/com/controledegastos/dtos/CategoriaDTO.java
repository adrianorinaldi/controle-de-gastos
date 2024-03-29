package com.controledegastos.dtos;

import jakarta.validation.constraints.NotBlank;

public record CategoriaDTO(Long id,
                           @NotBlank String descricao,
                           @NotBlank String tipo) {
}
