package com.controledegastos.controllers;

import com.controledegastos.dtos.CategoriaDTO;
import com.controledegastos.dtos.ContaDTO;
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
    public ResponseEntity<List<Categoria>> buscarTodasCategoria() {
        return ResponseEntity.status(HttpStatus.OK).body(this.categoriaService.buscarTodos());
    }

    @GetMapping({"/buscar_categoria_receitas"})
    public ResponseEntity<List<Categoria>> buscarCategoriaReceitas() {
        return ResponseEntity.status(HttpStatus.OK).body(this.categoriaService.buscarCategoriaReceitas());
    }

    @GetMapping({"/buscar_categoria_despesas"})
    public ResponseEntity<List<Categoria>> buscarCategoriaDespesas() {
        return ResponseEntity.status(HttpStatus.OK).body(this.categoriaService.buscarCategoriaDespesas());
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<Boolean> deletarCategoria(@PathVariable Long id) {
        return ResponseEntity.ok(this.categoriaService.deletarCategoria(id));
    }

    @PostMapping({"/alterar"})
    public ResponseEntity<Boolean> alterarCategoria(@RequestBody @Valid CategoriaDTO categoriaDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.categoriaService.alterarCategoria(categoriaDto));
    }
}
