package com.controledegastos.controllers;

import com.controledegastos.dtos.CategoriaDTO;
import com.controledegastos.entities.Categoria;
import com.controledegastos.services.CategoriaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin({"*"})
@RestController
@RequestMapping({"/categoria"})
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @PostMapping({"/salvar"})
    public ResponseEntity<CategoriaDTO> salvarCategoria(@RequestBody @Valid CategoriaDTO contaDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.categoriaService.salvar(contaDto));
    }

    @GetMapping({"/buscar_todas"})
    public ResponseEntity<List<Categoria>> buscarTodasContas() {
        return ResponseEntity.status(HttpStatus.OK).body(this.categoriaService.buscarTodos());
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<Boolean> deletarConta(@PathVariable Long id) {
        return ResponseEntity.ok(this.categoriaService.deletarCategoria(id));
    }
}
