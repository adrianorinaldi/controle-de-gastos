package com.controledegastos.services;

import com.controledegastos.dtos.ContaDTO;
import com.controledegastos.entities.Conta;
import com.controledegastos.repositories.ContaRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ContaService {

    @Autowired
    private ContaRepository contaRepository;

    public ContaDTO salvar(ContaDTO contaDto) {
        Conta conta = new Conta();
        BeanUtils.copyProperties(contaDto, conta);
        contaRepository.save(conta);
        return contaDto;
    }

    public List<Conta> buscarTodos() {
        return contaRepository.findAll();
    }

}
