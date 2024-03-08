import { Form, Button } from 'react-bootstrap';
import './styles.css';
import React, { useState } from 'react';
import axios from 'axios';

function CadastroContas() {
    const [formulario, setFormulario] = useState({
      descricao: ''
    });
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormulario({ ...formulario, [name]: value });
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const response = await axios.post('http://localhost:8080/conta/salvar', formulario);
  
        if (response.status === 201) {
          console.log('Dados enviados com sucesso!');
          // Faça algo após o envio bem-sucedido, como limpar o formulário ou mostrar uma mensagem de confirmação
        } else {
          console.error('Erro ao enviar os dados.' + response);
        }
      } catch (error) {
        console.error('Erro:', error);
      }
    };

    return (
      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Cadastro de Contas</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Digite a descrição da conta..." 
              name="descricao"
              value={formulario.descricao}
              onChange={handleChange}
              />
          </Form.Group>
          <div className='botoes'>
            <Button variant="danger" href="/">
              CANCELAR
            </Button>
            <Button variant="success" type="submit">
              CADASTRAR
            </Button>
          </div>
        </Form>
      </div>
    );
}
export default CadastroContas;