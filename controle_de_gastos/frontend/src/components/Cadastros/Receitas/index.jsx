import { Button, Form, Table, Modal } from "react-bootstrap";
import "./styles.css";
import React, { useState } from 'react';
import axios from 'axios';

function Receitas () {
  const [mostrar, setMostrar] = useState(false);
  const fechar = () => setMostrar(false);
  const abrir = () => setMostrar(true);
  const [dados, setDados] = useState([]);
  const [formulario, setFormulario] = useState({
    valor: '',
    categoria: ''
  });

  const pegarValor = (event) => {
    const { name, value } = event.target;
    setFormulario({ ...formulario, [name]: value });
    console.log(formulario);
  };

  const buscarCategorias = async (event) => {
    try {

      const response = await axios.get('http://localhost:8080/categoria/buscar_todas');
      setDados(response.data);

    } catch (error) {
      console.error('Erro:', error);
    }
  } 

  const salvarConta = async (event) => {
    event.preventDefault();
  }
  
  return (
    <div>
      <div className='receitas'>
        <div>
          <Form.Label htmlFor="receitas">RECEITAS</Form.Label>
        </div>
        <div>
          <Form.Control
            type="text"
            id="receitas"
            aria-describedby="passwordHelpBlock"
            defaultValue={"R$ 5.000,00"}
          />
        </div>
      </div>
      <hr></hr>
      <div className="quadro-receitas">
          <div>
            <Button variant="primary" onClick={abrir}>
              +
            </Button>
            <Modal show={mostrar} onHide={fechar}>
              <Modal.Header closeButton>
                <Modal.Title>ADICIONAR RECEITA</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={salvarConta}>
                  <Form.Group className="mb-1">
                    <Form.Label>Valor</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="Digite o valor" 
                      name="valor"
                      value={formulario.valor}
                      onChange={pegarValor}
                      />
                  </Form.Group>
                  <Form.Group className="mb-1" onClick={buscarCategorias}>
                    <Form.Label>Categoria</Form.Label>
                    <Form.Select 
                      name="categoria"
                      value={formulario.categoria}
                      onChange={pegarValor}
                      >
                      {dados.map((item) => (
                        <option 
                          key={item.id} 
                          value={item.id}
                          >
                            {item.descricao}
                        </option>
                      ))}
                  </Form.Select>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={fechar}>
                  CANCELAR
                </Button>
                <Button variant="primary" onClick={fechar}>
                  SALVAR
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <div className='tabela-receita'>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>dia</th>
                  <th>descrição</th>
                  <th>valor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>12</td>
                  <td>Salário</td>
                  <td>3.500,00</td>
                  <td><Button>AL</Button></td>
                  <td><Button variant='danger'>X</Button></td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
  );
}

export default Receitas;