import { Button, Form, Table } from 'react-bootstrap';
import './styles.css';
import axios from 'axios';
import { React, useState, useEffect } from 'react';

function Inicio () {

  const [totalReceita, setTotalReceita] = useState([]);
  const [totalDespesa, setTotalDespesa] = useState([]);
  const [totalSaldo, setTotalSaldo] = useState([]);

  useEffect(() => {
    buscarTotalReceita();
    buscarTotalDespesa();
    buscarTotal();
  }, []);

  const buscarTotalReceita = async (event) => {
    try {
      const response = await axios.get(`http://localhost:8080/receita/buscar_total_receita`);
      setTotalReceita(response.data);

    } catch (error) {
      console.error('Erro:', error);
    }
  } 

  const buscarTotalDespesa = async (event) => {
    try {
      const response = await axios.get(`http://localhost:8080/despesa/buscar_total_despesa`);
      setTotalDespesa(response.data);

    } catch (error) {
      console.error('Erro:', error);
    }
  } 

  const buscarTotal = async (event) => {
    try {
      const despesa = await axios.get(`http://localhost:8080/despesa/buscar_total_despesa`);
      const receita = await axios.get(`http://localhost:8080/receita/buscar_total_receita`);

      setTotalSaldo(receita.data - despesa.data);

    } catch (error) {
      console.error('Erro:', error);
    }
  }

  return (
    <div >
      <div className='saldo'>
        <div>
          <Form.Label htmlFor="saldo">SALDO</Form.Label>
        </div>
        <div>
          <Form.Control
            type="text"
            id="saldo"
            className="text-center"
            aria-describedby="passwordHelpBlock"
            defaultValue={totalSaldo}
          />
        </div>
      </div>
      <div className='receita-despesa'>
        <div className='receita'>
          <div>
            <Form.Label htmlFor="receita">RECEITA</Form.Label>
          </div>
          <div>
            <Form.Control
              type="text"
              id="receita"
              className="text-center"
              aria-describedby="passwordHelpBlock"
              defaultValue={totalReceita}
            />
          </div>
        </div>
        <div className='despesa'>
          <div>
            <Form.Label htmlFor="despesa">DESPESA</Form.Label>
          </div>
          <div>
            <Form.Control
              type="text"
              id="despesa"
              aria-describedby="passwordHelpBlock"
              defaultValue={totalDespesa}
            />
          </div>
        </div>
      </div>
      <hr></hr>
     
    </div>
  );
}

export default Inicio;