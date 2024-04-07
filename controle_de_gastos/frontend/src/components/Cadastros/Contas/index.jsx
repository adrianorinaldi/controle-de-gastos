import { Form, Button, Table, Modal } from 'react-bootstrap';
import './styles.css';
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

function CadastroContas() {
  const [dados, setDados] = useState([]);
  const [mostrar, setMostrar] = useState(false);
  const fechar = () => setMostrar(false);

  const [formulario, setFormulario] = useState({
    id: '',
    descricao: ''
  });

  useEffect(() => {
    buscarTodasContas();
  }, []);

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

    const novoErros = {
      descricao: formulario.descricao === ''
    };

    setErros(novoErros);

    // Se algum campo estiver vazio, não prosseguir com o salvamento
    if (Object.values(novoErros).some(erro => erro)) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/conta/salvar', formulario);

      if (response.status === 201) {
        toast.success("Conta Cadastrada com sucesso!",{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        formulario.descricao = '';
        buscarTodasContas();
      } else {
        console.error('Erro ao enviar os dados.' + response);
        toast.error("Erro ao tentar cadastrar!");
      }
    } catch (error) {
      console.error('Erro:', error);
      toast.error("Erro ao tentar cadastrar!");
    }
  };

  const excluirConta = async (id) => {

    try {
      const response = await axios.delete(`http://localhost:8080/conta/deletar/${id}`);

      if (response) {
        console.log("excluiu");
        toast.success("Conta Excluída com sucesso!");
        buscarTodasContas();
      } else {
        console.log("Não excluiu");
        toast.error("Erro ao tentar cadastrar!");
      }
    } catch (error) {
      console.error('Erro:', error);
      toast.error("Erro ao tentar cadastrar!");
    }
  };

  const abrirTelaAlterarConta = (idConta) => {
    setMostrar(true);
    setFormulario({ ...formulario, 'id': idConta });
  };

  const alterarConta = () => {
    const novoErros = {
      descricao: formulario.descricao === ''
    };

    setErros(novoErros);

    // Se algum campo estiver vazio, não prosseguir com o salvamento
    if (Object.values(novoErros).some(erro => erro)) {
      return;
    }
    
    salvarAlteracaoConta();
    setMostrar(false);
    setFormulario({ ...formulario, 'id': '', descricao: '' });
  };

  const salvarAlteracaoConta = async (event) => {
    //event.preventDefault();

    console.log(formulario);

    try {
      const response = await axios.post('http://localhost:8080/conta/alterar', formulario);

      if (response.status === 201) {
        console.log('Conta Alterada com sucesso!');
        toast.success("Conta Alterada com sucesso!");
        formulario.descricao = '';
        buscarTodasContas();
      } else {
        console.error('Erro ao enviar os dados.' + response);
        toast.error("Erro ao tentar alterar!");
      }
    } catch (error) {
      console.error('Erro:', error);
      toast.error("Erro ao tentar alterar!");
    }
  };

  const [erros, setErros] = useState({
    descricao: false
  });

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
      <div className='tabela-conta'>
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
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                  <Button variant="info" onClick={() => abrirTelaAlterarConta(item.id)}>
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
            <Modal.Title>ALTERAR CONTA</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-1">
                <Form.Label>Nova Descrição</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite a nova descrição da conta..."
                  name="descricao"
                  value={formulario.descricao}
                  onChange={pegarValor}
                  isInvalid={erros.descricao}
                />
                <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={fechar}>
              CANCELAR
            </Button>
            <Button variant="primary" onClick={alterarConta}>
              ALTERAR
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div>
        {/* <Alerta mostrar={mostrarMensagemSucesso} mensagem="teste" />*/}
        
       
      </div>
    </div>
  );
}
export default CadastroContas;