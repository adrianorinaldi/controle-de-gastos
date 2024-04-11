package com.controledegastos.services;

import com.controledegastos.dtos.ReceitaDTO;
import com.controledegastos.dtos.ReceitaDTOResponse;
import com.controledegastos.entities.Categoria;
import com.controledegastos.entities.Conta;
import com.controledegastos.entities.Receita;
import com.controledegastos.repositories.CategoriaRepository;
import com.controledegastos.repositories.ContaRepository;
import com.controledegastos.repositories.ReceitaRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
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
        receita.setId(receitaDto.id());

        receitaRepository.save(receita);
        return receitaDto;
    }

    public List<ReceitaDTOResponse> buscarTodos() {
        Sort sortById = Sort.by(Sort.Direction.DESC, "data");
        List<ReceitaDTOResponse> receitasDTOResponse = new ArrayList<>();

        for(Receita receita : receitaRepository.findAll(sortById)) {
            ReceitaDTOResponse receitaDTOResponse = new ReceitaDTOResponse(receita.getId(),receita.getDescricao(),
                                                   receita.getCategoria().getId(), receita.getCategoria().getDescricao(), receita.getData().toString(),
                                                   receita.getConta().getId(), receita.getConta().getDescricao(), receita.getValor());
            receitasDTOResponse.add(receitaDTOResponse);
        }
        return receitasDTOResponse;
    }

    public Boolean deletarReceita(Long id) {
        Optional<Receita> receita = receitaRepository.findById(id);

        if (!receita.isEmpty()) {
            receitaRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public BigDecimal buscarTotalReceita() {
        return receitaRepository.buscarTotalReceita();
    }

}
