package com.controledegastos.dtos;

import jakarta.validation.constraints.NotBlank;

public record ContaDTO(@NotBlank String descricao) {
}
