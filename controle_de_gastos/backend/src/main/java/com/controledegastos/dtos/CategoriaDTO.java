package com.controledegastos.dtos;

import jakarta.validation.constraints.NotBlank;

public record CategoriaDTO(@NotBlank String descricao, @NotBlank String tipo) {
}
