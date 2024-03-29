package com.controledegastos.repositories;

import com.controledegastos.entities.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

    @Query("SELECT categoria FROM Categoria categoria where categoria.tipo = 'R' order by categoria.id")
    List<Categoria> buscarCategoriaReceitas();

    @Query("SELECT categoria FROM Categoria categoria where categoria.tipo = 'D' order by categoria.id")
    List<Categoria> buscarCategoriaDespesas();
}
