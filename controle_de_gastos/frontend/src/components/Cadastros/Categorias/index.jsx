import { Form, Button, Table, Modal } from 'react-bootstrap';
import './styles.css';
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

function Categorias() {
  const [mostrar, setMostrar] = useState(false);
  const fechar = () => setMostrar(false);
  const [dados, setDados] = useState([]);
  const [formulario, setFormulario] = useState({
    id: '',
    descricao: '',
    tipo: 'R'
  });

  useEffect(() => {
    buscarTodasCategorias();
  }, []);

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

  const salvarAlteracaoCategoria = async (event) => {
    //event.preventDefault();

    console.log(formulario);

    try {
      const response = await axios.post('http://localhost:8080/categoria/alterar', formulario);

      if (response.status === 201) {
        console.log('Conta Alterada com sucesso!');
        formulario.descricao = '';
        buscarTodasCategorias();
      } else {
        console.error('Erro ao enviar os dados.' + response);
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const abrirTelaAlterarCategoria = (idCategoria, descricaoCategoria, tipoCategoria) => {
    setMostrar(true);
    setFormulario({ ...formulario, 'id': idCategoria, 'descricao': descricaoCategoria, 'tipo': tipoCategoria});
  };

  const alterarCategoria = () => {
    salvarAlteracaoCategoria();
    setMostrar(false);
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
            </div>
          </Form>
        </div>
        <div className='tabela-categoria'>
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
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                    <Button variant="info" onClick={() => abrirTelaAlterarCategoria(item.id, item.descricao, item.tipo)}>
                      <FontAwesomeIcon icon={faPen} />
                    </Button>
                  </td>
                </tr>
                ))}
            </tbody>
          </Table>
        </div>
        <div>
          <Modal scrollable="true" show={mostrar} onHide={fechar}>
            <Modal.Header closeButton>
              <Modal.Title>ALTERAR CATEGORIA</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-1">
                  <Form.Label>Nova Categoria</Form.Label>
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
                      checked={formulario.tipo == 'R' ? true : false}
                      />
                    <Form.Check 
                      inline
                      type="radio" 
                      label="Despesa" 
                      id="D"
                      name="tipo"
                      value="D"
                      onChange={pegarValor}
                      checked={formulario.tipo == 'D' ? true : false}
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
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={fechar}>
                CANCELAR
              </Button>
              <Button variant="primary" onClick={alterarCategoria}>
                ALTERAR
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
  );
}

export default Categorias;