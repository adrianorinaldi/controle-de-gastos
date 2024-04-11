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
@RequestMapping({"/teste"})
public class TesteDeConexãoController {

    @GetMapping({"/teste_de_conexao"})
    public ResponseEntity<Boolean> buscarTodasContas() {
        return ResponseEntity.status(HttpStatus.OK).body(true);
    }

}
