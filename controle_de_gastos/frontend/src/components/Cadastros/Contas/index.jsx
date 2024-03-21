import { Form, Button, Table } from 'react-bootstrap';
import './styles.css';
import React, { useState } from 'react';
import axios from 'axios';

function CadastroContas() {
  const [dados, setDados] = useState([]);
  
  const [formulario, setFormulario] = useState({
      descricao: ''
    });
  
    const pegarValor = (event) => {
      const { name, value } = event.target;
      setFormulario({ ...formulario, [name]: value });
    };

    const buscarTodasContas = async (event) => {

      try {

        const response = await axios.get('http://localhost:8080/conta/buscar_todas');

        setDados(response.data);

      } catch (error) {
        console.error('Erro:', error);
      }
    };
  
    const salvarConta = async (event) => {
      event.preventDefault();
  
      try {
        const response = await axios.post('http://localhost:8080/conta/salvar', formulario);
  
        if (response.status === 201) {
          console.log('Conta Cadastrada com sucesso!');
          buscarTodasContas();
        } else {
          console.error('Erro ao enviar os dados.' + response);
        }
      } catch (error) {
        console.error('Erro:', error);
      }
    };

    const excluirConta = async (id) => {
        
      console.log("depois="+id);

        try {
          const response = await axios.delete(`http://localhost:8080/conta/deletar/${id}`);

          if(response) {
            console.log("excluiu");
            buscarTodasContas();
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
          <Form onSubmit={salvarConta}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Cadastro de Contas</Form.Label>
              <br></br>
              <Form.Label>Descrição</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Digite a descrição da conta..." 
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
              <Button variant="info" onClick={buscarTodasContas}>
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
              </tr>
            </thead>
            <tbody>
              {dados.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.descricao}</td>
                  <td>
                    <Button variant="danger" onClick={() => excluirConta(item.id)}>
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
export default CadastroContas;