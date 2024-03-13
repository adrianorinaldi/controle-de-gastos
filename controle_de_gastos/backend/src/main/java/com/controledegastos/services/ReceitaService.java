package com.controledegastos.services;

import com.controledegastos.dtos.ReceitaDTO;
import com.controledegastos.entities.Receita;
import com.controledegastos.repositories.ReceitaRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReceitaService {

    @Autowired
    private ReceitaRepository receitaRepository;

    public ReceitaDTO salvar(ReceitaDTO receitaDto) {
        Receita receita = new Receita();
        BeanUtils.copyProperties(receitaDto, receita);
        receitaRepository.save(receita);
        return receitaDto;
    }

    public List<Receita> buscarTodos() {
        return receitaRepository.findAll();
    }

    public Boolean deletarReceita(Long id) {
        Optional<Receita> receita = receitaRepository.findById(id);

        if (!receita.isEmpty()) {
            receitaRepository.deleteById(id);
            return true;
        }
        return false;
    }

}
