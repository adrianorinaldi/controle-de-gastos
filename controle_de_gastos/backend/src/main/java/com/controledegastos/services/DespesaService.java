package com.controledegastos.services;

import com.controledegastos.dtos.DespesaDTO;
import com.controledegastos.dtos.DespesaDTOResponse;
import com.controledegastos.entities.Categoria;
import com.controledegastos.entities.Conta;
import com.controledegastos.entities.Despesa;
import com.controledegastos.repositories.CategoriaRepository;
import com.controledegastos.repositories.ContaRepository;
import com.controledegastos.repositories.DespesaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DespesaService {

    @Autowired
    private DespesaRepository despesaRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private ContaRepository contaRepository;

    public DespesaDTO salvar(DespesaDTO despesaDto) {
        Despesa despesa = new Despesa();
        Optional<Categoria> categoria = categoriaRepository.findById(despesaDto.categoria());
        if (categoria.isPresent()) {
            despesa.setCategoria(categoria.get());
        } else {
            // Lidar com a situação em que a categoria não foi encontrada
            // Por exemplo, lançar uma exceção, atribuir um valor padrão, etc.
        }
        Optional<Conta> conta = contaRepository.findById(despesaDto.conta());
        if (conta.isPresent()) {
            despesa.setConta(conta.get());
        } else {
            // Lidar com a situação em que a categoria não foi encontrada
            // Por exemplo, lançar uma exceção, atribuir um valor padrão, etc.
        }

        despesa.setDescricao(despesaDto.descricao());
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        try {
            despesa.setData(formatter.parse(despesaDto.data()));
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        despesa.setValor(despesaDto.valor());

        despesaRepository.save(despesa);
        return despesaDto;
    }

    public List<DespesaDTOResponse> buscarTodos() {
        Sort sortById = Sort.by(Sort.Direction.DESC, "data");
        List<DespesaDTOResponse> DespesasDTOResponse = new ArrayList<>();

        for(Despesa Despesa : despesaRepository.findAll(sortById)) {
            DespesaDTOResponse DespesaDTOResponse = new DespesaDTOResponse(Despesa.getId(),Despesa.getDescricao(),
                    Despesa.getCategoria().getDescricao(), Despesa.getData().toString(),
                    Despesa.getConta().getDescricao(), Despesa.getValor());
            DespesasDTOResponse.add(DespesaDTOResponse);
        }
        return DespesasDTOResponse;
    }

    public Boolean deletarDespesa(Long id) {
        Optional<Despesa> despesa = despesaRepository.findById(id);

        if (!despesa.isEmpty()) {
            despesaRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public BigDecimal buscarTotalDespesa() {
        return despesaRepository.buscarTotalDespesa();
    }

}
