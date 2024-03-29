package com.controledegastos.repositories;

import com.controledegastos.entities.Despesa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
public interface DespesaRepository extends JpaRepository<Despesa, Long> {

    @Query("SELECT sum(despesa.valor) FROM Despesa despesa")
    BigDecimal buscarTotalDespesa();
}
