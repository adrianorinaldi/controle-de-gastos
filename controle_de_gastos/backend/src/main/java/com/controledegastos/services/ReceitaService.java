package com.controledegastos.services;

import com.controledegastos.dtos.ReceitaDTO;
import com.controledegastos.entities.Categoria;
import com.controledegastos.entities.Conta;
import com.controledegastos.entities.Receita;
import com.controledegastos.repositories.CategoriaRepository;
import com.controledegastos.repositories.ContaRepository;
import com.controledegastos.repositories.ReceitaRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReceitaService {

    @Autowired
    private ReceitaRepository receitaRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private ContaRepository contaRepository;

    public ReceitaDTO salvar(ReceitaDTO receitaDto) {
        Receita receita = new Receita();
        Optional<Categoria> categoria = categoriaRepository.findById(receitaDto.categoria());
        if (categoria.isPresent()) {
            receita.setCategoria(categoria.get());
        } else {
            // Lidar com a situação em que a categoria não foi encontrada
            // Por exemplo, lançar uma exceção, atribuir um valor padrão, etc.
        }
        Optional<Conta> conta = contaRepository.findById(receitaDto.conta());
        if (conta.isPresent()) {
            receita.setConta(conta.get());
        } else {
            // Lidar com a situação em que a categoria não foi encontrada
            // Por exemplo, lançar uma exceção, atribuir um valor padrão, etc.
        }

        receita.setDescricao(receitaDto.descricao());
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        try {
            receita.setData(formatter.parse(receitaDto.data()));
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        receita.setValor(receitaDto.valor());

        receitaRepository.save(receita);
        return receitaDto;
    }

    public List<ReceitaDTO> buscarTodos() {
        List<ReceitaDTO> receitasDto = new ArrayList<>();

        for(Receita receita : receitaRepository.findAll()) {
            ReceitaDTO receitaDto = new ReceitaDTO(receita.getDescricao(), receita.getCategoria().getId(),
                                                   receita.getData().toString(), receita.getConta().getId(),
                                                   receita.getValor());
            receitasDto.add(receitaDto);
        }
        return receitasDto;
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
