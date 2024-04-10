import { Form, Button, Table, Modal } from 'react-bootstrap';
import './styles.css';
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

function Categorias() {
  const [mostrar, setMostrar] = useState(false);
  const fechar = () => setMostrar(false);
  const [dados, setDados] = useState([]);
  const [formulario, setFormulario] = useState({
    id: '',
    descricao: '',
    tipo: 'R'
  });
  const [formularioAlteracao, setFormularioAlteracao] = useState({
    id: '',
    descricao: '',
    tipo: 'R'
  });

  const [erros, setErros] = useState({
    descricao: false,
  });

  const [errosAlteracao, setErrosAlteracao] = useState({
    descricao_alteracao: false
  });

  useEffect(() => {
    buscarTodasCategorias();
  }, []);

  const pegarValor = (event) => {
    const { name, value } = event.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const pegarValorAlteracao = (event) => {
    const { name, value } = event.target;
    setFormularioAlteracao({ ...formularioAlteracao, [name]: value });
  };

  const buscarTodasCategorias = async (event) => {
    try {
      const response = await axios.get('http://localhost:8080/categoria/buscar_todas');
      setDados(response.data);
    } catch (error) {
      console.error('Erro:', error);
      toast.error("Erro ao tentar buscar todas as categorias!");
    }
  };

  const salvarCategoria = async (event) => {
    event.preventDefault();
    console.log(formulario);
    const novoErros = {
      descricao: formulario.descricao === ''
    };
    setErros(novoErros);
    if (Object.values(novoErros).some(erro => erro)) {
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/categoria/salvar', formulario);
      if (response.status === 201) {
        console.log('Categoria Cadastrada com sucesso!');
        toast.success("Categoria Cadastrada com sucesso!");
        buscarTodasCategorias();
      } else {
        console.error('Erro ao enviar os dados.' + response);
        toast.error("Erro ao tentar cadastrar!");
      }
    } catch (error) {
      console.error('Erro:', error);
      toast.error("Erro ao tentar cadastrar!");
    }
  };

  const excluirCategoria = async (id) => {
      try {
        const response = await axios.delete(`http://localhost:8080/categoria/deletar/${id}`);
        if(response) {
          console.log("excluiu");
          toast.success("Categoria Excluída com sucesso!");
          buscarTodasCategorias();
        } else {
          console.log("Não excluiu");
          toast.error("Erro ao tentar excluir!");
        }
      } catch (error) {
        console.error('Erro:', error);
        toast.error("Erro ao tentar excluir!");
      }
  };

  const abrirTelaAlterarCategoria = (idCategoria, descricaoCategoria, tipoCategoria) => {
    setMostrar(true);
    setFormularioAlteracao({ ...formularioAlteracao, 'id': idCategoria, 'descricao': descricaoCategoria, 'tipo': tipoCategoria});
  };

  const alterarCategoria = () => {
    const novoErros = {
      descricao_alteracao: formularioAlteracao.descricao === ''
    };
    setErrosAlteracao(novoErros);
    if (Object.values(novoErros).some(erro => erro)) {
      return;
    }
    salvarAlteracaoCategoria();
    setMostrar(false);
    setFormulario({ ...formularioAlteracao, 'id': '', 'descricao': '', 'tipo': ''});
  };

  const salvarAlteracaoCategoria = async (event) => {
    try {
      const response = await axios.post('http://localhost:8080/categoria/salvar', formularioAlteracao);
      if (response.status === 201) {
        console.log('Conta Alterada com sucesso!');
        toast.success("Categoria Alterada com sucesso!");
        formularioAlteracao.descricao = '';
        buscarTodasCategorias();
      } else {
        console.error('Erro ao enviar os dados.' + response);
        toast.error("Erro ao tentar alterar!");
      }
    } catch (error) {
      console.error('Erro:', error);
      toast.error("Erro ao tentar alterar!");
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
                isInvalid={erros.descricao}
                />
                <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
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
                      onChange={pegarValorAlteracao}
                      checked={formularioAlteracao.tipo == 'R' ? true : false}
                      />
                    <Form.Check 
                      inline
                      type="radio" 
                      label="Despesa" 
                      id="D"
                      name="tipo"
                      value="D"
                      onChange={pegarValorAlteracao}
                      checked={formularioAlteracao.tipo == 'D' ? true : false}
                      />
                  </div>
                  <br></br>
                  <Form.Label>Descrição</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Digite a descrição da categoria..." 
                    name="descricao"
                    value={formularioAlteracao.descricao}
                    onChange={pegarValorAlteracao}
                    isInvalid={errosAlteracao.descricao_alteracao}
                    />
                    <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
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