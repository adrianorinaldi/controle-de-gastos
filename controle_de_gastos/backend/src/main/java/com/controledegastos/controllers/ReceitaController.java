package com.controledegastos.controllers;

import com.controledegastos.dtos.ReceitaDTO;
import com.controledegastos.dtos.ReceitaDTOResponse;
import com.controledegastos.entities.Receita;
import com.controledegastos.services.ReceitaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@CrossOrigin({"*"})
@RestController
@RequestMapping({"/receita"})
public class ReceitaController {

    @Autowired
    private ReceitaService receitaService;

    @PostMapping({"/salvar"})
    public ResponseEntity<ReceitaDTO> salvarReceita(@RequestBody @Valid ReceitaDTO receitaDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.receitaService.salvar(receitaDto));
    }

    @GetMapping({"/buscar_todas"})
    public ResponseEntity<List<ReceitaDTOResponse>> buscarTodasReceitas() {
        return ResponseEntity.status(HttpStatus.OK).body(this.receitaService.buscarTodos());
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<Boolean> deletarReceita(@PathVariable Long id) {
        return ResponseEntity.ok(this.receitaService.deletarReceita(id));
    }

    @GetMapping({"/buscar_total_receita"})
    public ResponseEntity<BigDecimal> buscarTotalReceita() {
        return ResponseEntity.status(HttpStatus.OK).body(this.receitaService.buscarTotalReceita());
    }
}