import { Form, Button, Table } from 'react-bootstrap';
import './styles.css';
import React, { useState } from 'react';
import axios from 'axios';

function Categorias() {

  const [dados, setDados] = useState([]);
  const [formulario, setFormulario] = useState({
    descricao: '',
    tipo: 'R'
  });

  const pegarValor = (event) => {
    const { name, value } = event.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const buscarTodasCategorias = async (event) => {

    try {

      const response = await axios.get('http://localhost:8080/categoria/buscar_todas');

      setDados(response.data);

    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const salvarCategoria = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/categoria/salvar', formulario);

      if (response.status === 201) {
        console.log('Categoria Cadastrada com sucesso!');
        buscarTodasCategorias();
      } else {
        console.error('Erro ao enviar os dados.' + response);
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const excluirCategoria = async (id) => {
      
      try {
        const response = await axios.delete(`http://localhost:8080/categoria/deletar/${id}`);

        if(response) {
          console.log("excluiu");
          buscarTodasCategorias();
        } else {
          console.log("Não excluiu");
        }
      } catch (error) {
        console.error('Erro:', error);
      }
  };

  return (
      <div>
        <div>
          <Form onSubmit={salvarCategoria}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Cadastro de Categorias</Form.Label>
              <br></br>
              <Form.Label>Tipo</Form.Label>
              <div>
                <Form.Check 
                  inline
                  type="radio" 
                  label="Receita" 
                  id="R"
                  name="tipo"
                  value="R"
                  onChange={pegarValor}
                  defaultChecked
                  />
                <Form.Check 
                  inline
                  type="radio" 
                  label="Despesa" 
                  id="D"
                  name="tipo"
                  value="D"
                  onChange={pegarValor}
                  />
              </div>
              <br></br>
              <Form.Label>Descrição</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Digite a descrição da categoria..." 
                name="descricao"
                value={formulario.descricao}
                onChange={pegarValor}
                />
            </Form.Group>
            <div className='botoes'>
              <Button variant="danger" href="/">
                CANCELAR
              </Button>
              <Button variant="success" type="submit">
                CADASTRAR
              </Button>
              <Button variant="info" onClick={buscarTodasCategorias}>
                CARREGAR
              </Button>
            </div>
          </Form>
        </div>
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Descrição</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {dados.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.descricao}</td>
                  <td>{item.tipo == 'R' ? 'Receita' : 'Despesa'}</td>
                  <td>
                    <Button variant="danger" onClick={() => excluirCategoria(item.id)}>
                      X
                    </Button>
                  </td>
                </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
  );
}

export default Categorias;