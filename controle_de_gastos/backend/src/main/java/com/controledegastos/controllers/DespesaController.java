package com.controledegastos.controllers;

import com.controledegastos.dtos.DespesaDTO;
import com.controledegastos.dtos.DespesaDTOResponse;
import com.controledegastos.services.DespesaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@CrossOrigin({"*"})
@RestController
@RequestMapping({"/despesa"})
public class DespesaController {

    @Autowired
    private DespesaService despesaService;

    @PostMapping({"/salvar"})
    public ResponseEntity<DespesaDTO> salvarDespesa(@RequestBody @Valid DespesaDTO despesaDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.despesaService.salvar(despesaDto));
    }

    @GetMapping({"/buscar_todas"})
    public ResponseEntity<List<DespesaDTOResponse>> buscarTodasDespesas() {
        return ResponseEntity.status(HttpStatus.OK).body(this.despesaService.buscarTodos());
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<Boolean> deletarDespesa(@PathVariable Long id) {
        return ResponseEntity.ok(this.despesaService.deletarDespesa(id));
    }

    @GetMapping({"/buscar_total_despesa"})
    public ResponseEntity<BigDecimal> buscarTotalDespesa() {
        return ResponseEntity.status(HttpStatus.OK).body(this.despesaService.buscarTotalDespesa());
    }
}