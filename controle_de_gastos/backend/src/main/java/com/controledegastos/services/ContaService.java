package com.controledegastos.services;

import com.controledegastos.dtos.ContaDTO;
import com.controledegastos.entities.Conta;
import com.controledegastos.repositories.ContaRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
        Sort sortById = Sort.by(Sort.Direction.ASC, "id");
        return contaRepository.findAll(sortById);
    }

    public Boolean deletarConta(Long id) {
        Optional<Conta> conta = contaRepository.findById(id);

        if (!conta.isEmpty()) {
            contaRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Boolean alterarConta(ContaDTO contaDto) {
        Conta conta = new Conta();
        BeanUtils.copyProperties(contaDto, conta);
        contaRepository.save(conta);
        return true;
    }

}
