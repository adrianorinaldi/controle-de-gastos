import { Form, Button } from 'react-bootstrap';
import './styles.css';
import React, { useState } from 'react';

function CadastroContas() {
    const [formulario, setFormulario] = useState({
      nome: ''
    });
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormulario({ ...formulario, [name]: value });
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const response = await axios.post('URL_DO_SEU_ENDPOINT', formulario);
  
        if (response.status === 200) {
          console.log('Dados enviados com sucesso!');
          // Faça algo após o envio bem-sucedido, como limpar o formulário ou mostrar uma mensagem de confirmação
        } else {
          console.error('Erro ao enviar os dados.');
        }
      } catch (error) {
        console.error('Erro:', error);
      }
    };

    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Cadastro de Contas</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Digite o nome da conta..." 
            name="nome"
            value={formulario.nome}
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
    );
}
export default CadastroContas;