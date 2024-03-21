package com.controledegastos.repositories;

import com.controledegastos.entities.Receita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
public interface ReceitaRepository extends JpaRepository<Receita, Long> {

    /*@Query("SELECT sum(valor) FROM receita WHERE conta_id = :conta_id")
    Double buscarTotalReceita(@Param("conta_id") Long contaId);*/

    @Query("SELECT sum(receita.valor) FROM Receita receita")
    BigDecimal buscarTotalReceita();
}
