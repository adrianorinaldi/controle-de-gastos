package com.controledegastos.services;

import com.controledegastos.dtos.CategoriaDTO;
import com.controledegastos.dtos.ContaDTO;
import com.controledegastos.entities.Categoria;
import com.controledegastos.entities.Conta;
import com.controledegastos.repositories.CategoriaRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    public CategoriaDTO salvar(CategoriaDTO categoriaDto) {
        Categoria categoria = new Categoria();
        BeanUtils.copyProperties(categoriaDto, categoria);
        categoriaRepository.save(categoria);
        return categoriaDto;
    }

    public List<Categoria> buscarTodos() {
        Sort sortById = Sort.by(Sort.Direction.ASC, "id");
        return categoriaRepository.findAll(sortById);
    }

    public List<Categoria> buscarCategoriaReceitas() {
        return categoriaRepository.buscarCategoriaReceitas();
    }

    public List<Categoria> buscarCategoriaDespesas() {
        return categoriaRepository.buscarCategoriaDespesas();
    }

    public Boolean deletarCategoria(Long id) {
        Optional<Categoria> categoria = categoriaRepository.findById(id);

        if (!categoria.isEmpty()) {
            categoriaRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Boolean alterarCategoria(CategoriaDTO categoriaDto) {
        Categoria categoria = new Categoria();
        BeanUtils.copyProperties(categoriaDto, categoria);
        categoriaRepository.save(categoria);
        return true;
    }

}
