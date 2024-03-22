package com.controledegastos.controllers;

import com.controledegastos.dtos.ContaDTO;
import com.controledegastos.entities.Conta;
import com.controledegastos.services.ContaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin({"*"})
@RestController
@RequestMapping({"/conta"})
public class ContaController {

    @Autowired
    private ContaService contaService;

    @PostMapping({"/salvar"})
    public ResponseEntity<ContaDTO> salvarConta(@RequestBody @Valid ContaDTO contaDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.contaService.salvar(contaDto));
    }

    @GetMapping({"/buscar_todas"})
    public ResponseEntity<List<Conta>> buscarTodasContas() {
        return ResponseEntity.status(HttpStatus.OK).body(this.contaService.buscarTodos());
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<Boolean> deletarConta(@PathVariable Long id) {
        return ResponseEntity.ok(this.contaService.deletarConta(id));
    }

    @PostMapping({"/alterar"})
    public ResponseEntity<Boolean> alterarConta(@RequestBody @Valid ContaDTO contaDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.contaService.alterarConta(contaDto));
    }
}
