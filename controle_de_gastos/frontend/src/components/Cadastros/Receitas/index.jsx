import { Button, Form, Table, Modal } from "react-bootstrap";
import "./styles.css";
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import { format } from 'date-fns';
// Registre o idioma para que o DatePicker o utilize
registerLocale('pt-BR', ptBR);

function Receitas () {
  const [mostrarModalCadastro, setMostrarModalCadastro] = useState(false);
  const fecharModalCadastro = () => setMostrarModalCadastro(false);
  const [mostrarModalAlterar, setMostrarModalAlterar] = useState(false);
  const [totalReceita, setTotalReceita] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [contas, setContas] = useState([]);
  const [receitas, setReceitas] = useState([]);
  const [formulario, setFormulario] = useState({
    id: '',
    valor: '',
    categoria: '',
    descricao: '',
    data: '',
    conta: ''
  });
  const [formularioAlteracao, setFormularioAlteracao] = useState({
    id: '',
    valor: '',
    categoria: '',
    descricao: '',
    data: '',
    conta: ''
  });
  const dataAtual = new Date();
  const [dataSelecionada, setDataSelecionada] = useState(null);
  const [dataSelecionadaAlteracao, setDataSelecionadaAlteracao] = useState(null);
    // Defina o idioma padrão para o DatePicker
    setDefaultLocale(ptBR);

  const pegarValor = async (event) => {
    const { name, value } = event.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const pegarValorAlteracao = async (event) => {
    const { name, value } = event.target;
    setFormulario({ ...formularioAlteracao, [name]: value });
  };

  const pegarValorDeData = (date) => {
    setDataSelecionada(date);
    setFormulario({ ...formulario, 'data': format(date, 'dd/MM/yyyy') });
  };

  const pegarValorDeDataAlteracao = (date) => {
    setDataSelecionada(date);
    setFormulario({ ...formularioAlteracao, 'data': format(date, 'dd/MM/yyyy') });
  };

  const [erros, setErros] = useState({
    valor: false,
    categoria: false,
    descricao: false,
    data: false,
    conta: false
  });

  const [errosAlteracao, setErrosAlteracao] = useState({
    valor: false,
    categoria: false,
    descricao: false,
    data: false,
    conta: false
  });

  useEffect(() => {
    buscarTotalReceita();
    buscarTodasReceitas();
  }, []);

  const abrirModalCadastrar = () => {
    setMostrarModalCadastro(true);
    setDataSelecionada(dataAtual);
    setFormulario({ ...formulario, id: '', valor: '', descricao: '', data: format(dataAtual, 'dd/MM/yyyy')});
  };

  const buscarTotalReceita = async (event) => {
    try {
      const response = await axios.get(`http://localhost:8080/receita/buscar_total_receita`);
      setTotalReceita(response.data);
    } catch (error) {
      console.error('Erro:', error);
      toast.error("Erro ao tentar buscar total da receita!");
    }
  } 

  const buscarCategorias = async (event) => {
    try {
      const response = await axios.get('http://localhost:8080/categoria/buscar_categoria_receitas');
      setCategorias(response.data);
    } catch (error) {
      console.error('Erro:', error);
      toast.error("Erro ao tentar buscar todas as categorias!");
    }
  } 

  const buscarContas = async (event) => {
    try {
      const response = await axios.get('http://localhost:8080/conta/buscar_todas');
      setContas(response.data);
    } catch (error) {
      console.error('Erro:', error);
      toast.error("Erro ao tentar buscar todas as contas!");
    }
  } 

  const buscarTodasReceitas = async (event) => {
    try {
      const response = await axios.get('http://localhost:8080/receita/buscar_todas');
      setReceitas(response.data);
      buscarTotalReceita();
    } catch (error) {
      console.error('Erro:', error);
      toast.error("Erro ao tentar buscar todas as receitas!");
    }
  };

  const salvarReceita = async (event) => {
    event.preventDefault();
    const novoErros = {
      valor: formulario.valor === '',
      categoria: formulario.categoria === '',
      descricao: formulario.descricao === '',
      data: formulario.data === '',
      conta: formulario.conta === ''
    };
    setErros(novoErros);
    if (Object.values(novoErros).some(erro => erro)) {
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/receita/salvar', formulario);
      if (response.status === 201) {
        console.log('Conta Cadastrada com sucesso!');
        toast.success("Receita Cadastrada com sucesso!");
        buscarTodasReceitas();
        fecharModalCadastro();
      } else {
        console.error('Erro ao enviar os dados.' + response);
        toast.error("Erro ao tentar cadastrar receita!");
      }
    } catch (error) {
      console.error('Erro:', error);
      toast.error("Erro ao tentar cadastrar receita!");
    }
  };

  const excluirReceita = async (id) => {
      try {
        const response = await axios.delete(`http://localhost:8080/receita/deletar/${id}`);
        if(response) {
          console.log("excluiu");
          toast.success("Receita Excluída com sucesso!");
          buscarTodasReceitas();
        } else {
          console.log("Não excluiu");
          toast.error("Erro ao tentar excluir receita!");
        }
      } catch (error) {
        console.error('Erro:', error);
        toast.error("Erro ao tentar excluir receita!");
      }
  };

  const abrirTelaAlterarReceita = (idReceita, valorReceita, descricaoReceita, dataReceita) => {
    setMostrarModalAlterar(true);
    setDataSelecionadaAlteracao(dataReceita);
    setFormularioAlteracao({ ...formularioAlteracao, id: idReceita, 
                                                     valor: valorReceita, 
                                                     descricao: descricaoReceita,
                                                     data: format(dataReceita, 'dd/MM/yyyy')
                                                    });
  };

  const alterarReceita = () => {
    const novoErros = {
      valor: formularioAlteracao.valor === '',
      categoria: formularioAlteracao.categoria === '',
      descricao: formularioAlteracao.descricao === '',
      data: formularioAlteracao.data === '',
      conta: formularioAlteracao.conta === ''
    };
    setErrosAlteracao(novoErros);
    if (Object.values(novoErros).some(erro => erro)) {
      return;
    }
    salvarAlteracaoReceita();
    setMostrarModalAlterar(false);
    fecharModalAlterar();
  };

  const salvarAlteracaoReceita = async (event) => {
    try {
      const response = await axios.post('http://localhost:8080/receita/salvar', formulario);
      if (response.status === 201) {
        console.log('Receita Alterada com sucesso!');
        toast.success("Receita Alterada com sucesso!");
        formulario.descricao = '';
        buscarTodasReceitas();
      } else {
        console.error('Erro ao enviar os dados.' + response);
        toast.error("Erro ao tentar alterar receita!");
      }
    } catch (error) {
      console.error('Erro:', error);
      toast.error("Erro ao tentar alterar receita!");
    }
  };

  const fecharModalAlterar = () => {
    setFormularioAlteracao({ ...formularioAlteracao, id: '',
                                                     valor: '',
                                                     categoria: '',
                                                     descricao: '',
                                                     data: '',
                                                     conta: ''});
    setMostrarModalAlterar(false);
  };

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
            className="text-center"
            aria-describedby="passwordHelpBlock"
            defaultValue={totalReceita}
          />
        </div>
      </div>
      <hr></hr>
      <div className="quadro-receitas">
          <div>
            <Modal scrollable="true" show={mostrarModalCadastro} onHide={fecharModalCadastro}>
              <Modal.Header closeButton>
                <Modal.Title>ADICIONAR RECEITA</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={salvarReceita}>
                  <Form.Group className="mb-1">
                    <Form.Label>Valor</Form.Label>
                    <Form.Control 
                      type="number" 
                      placeholder="Digite o valor" 
                      name="valor"
                      value={formulario.valor}
                      onChange={pegarValor}
                      className="campo-obrigatorio"
                      isInvalid={erros.valor}
                      />
                      <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-1" onClick={buscarCategorias}>
                    <Form.Label>Categoria</Form.Label>
                    <Form.Select 
                      name="categoria"
                      value={formulario.categoria}
                      onClick={pegarValor}
                      onChange={pegarValor}
                      className="campo-obrigatorio"
                      isInvalid={erros.categoria}
                      >
                      {categorias.map((item) => (
                        <option
                          key={item.id}
                          value={item.id}
                          >
                            {item.descricao}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-1">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="Digite a descrição" 
                      name="descricao"
                      value={formulario.descricao}
                      onChange={pegarValor}
                      className="campo-obrigatorio"
                      isInvalid={erros.descricao}
                      />
                      <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Data</Form.Label>
                    <br></br>
                    <DatePicker
                      showIcon
                      toggleCalendarOnIconClick
                      locale="pt-BR"
                      selected={dataSelecionada}
                      onChange={pegarValorDeData}
                      dateFormat="dd/MM/yyyy" 
                      className="form-control campo-obrigatorio" 
                      name="data"
                      isInvalid={erros.data}
                    />
                    <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-1" onClick={buscarContas}>
                    <Form.Label>Conta</Form.Label>
                    <Form.Select 
                      name="conta"
                      value={formulario.conta}
                      onClick={pegarValor}
                      onChange={pegarValor}
                      isInvalid={erros.conta}
                      >
                      {contas.map((item) => (
                        <option 
                          key={item.id}
                          value={item.id}
                          >
                            {item.descricao}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={fecharModalCadastro}>
                  CANCELAR
                </Button>
                <Button variant="primary" onClick={salvarReceita}>
                  SALVAR
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <div className='botoes'>
              <Button variant="danger" href="/">
                CANCELAR
              </Button>
              <Button variant="success" onClick={abrirModalCadastrar}>
                CADASTRAR
              </Button>
            </div>
          <div className='tabela-receitas'>
            <Table size="sm" striped bordered hover>
              <thead>
                <tr>
                  <th>dia</th>
                  <th>descrição</th>
                  <th>categoria</th>
                  <th>valor</th>
                </tr>
              </thead>
              <tbody>
              {receitas.map((item) => (
                <tr key={item.id}>
                  <td>{format(item.data, 'dd/MM/yyyy')}</td>
                  <td>{item.descricao}</td>
                  <td>{item.categoria}</td>
                  <td>{item.valor.toLocaleString('pt-BR')}</td>
                  <td>
                    <Button variant="danger" onClick={() => excluirReceita(item.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                    <Button variant="info" onClick={() => abrirTelaAlterarReceita(item.id, item.valor, item.descricao, item.data)}>
                      <FontAwesomeIcon icon={faPen} />
                    </Button>
                  </td>
                </tr>
                ))}
            </tbody>
            </Table>
          </div>
        </div>
        <div>
          <Modal scrollable="true" show={mostrarModalAlterar} onHide={fecharModalAlterar}>
            <Modal.Header closeButton>
              <Modal.Title>ALTERAR RECEITA</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
              <Form.Group className="mb-1">
                    <Form.Label>Valor</Form.Label>
                    <Form.Control 
                      type="number" 
                      placeholder="Digite o valor" 
                      name="valor"
                      value={formularioAlteracao.valor}
                      onChange={pegarValorAlteracao}
                      className="campo-obrigatorio"
                      isInvalid={errosAlteracao.valor}
                      />
                      <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-1" onClick={buscarCategorias}>
                    <Form.Label>Categoria</Form.Label>
                    <Form.Select 
                      name="categoria"
                      value={formularioAlteracao.categoria}
                      onClick={pegarValorAlteracao}
                      onChange={pegarValorAlteracao}
                      className="campo-obrigatorio"
                      isInvalid={errosAlteracao.categoria}
                      >
                      {categorias.map((item) => (
                        <option 
                          key={item.id} 
                          value={item.id}
                          >
                            {item.descricao}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-1">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="Digite a descrição" 
                      name="descricao"
                      value={formularioAlteracao.descricao}
                      onChange={pegarValorAlteracao}
                      className="campo-obrigatorio"
                      isInvalid={errosAlteracao.descricao}
                      />
                      <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Data</Form.Label>
                    <br></br>
                    <DatePicker
                      showIcon
                      toggleCalendarOnIconClick
                      locale="pt-BR"
                      selected={dataSelecionadaAlteracao}
                      onChange={pegarValorDeDataAlteracao}
                      dateFormat="dd/MM/yyyy" 
                      className="form-control campo-obrigatorio" 
                      name="data"
                      isInvalid={errosAlteracao.data}
                    />
                    <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-1" onClick={buscarContas}>
                    <Form.Label>Conta</Form.Label>
                    <Form.Select 
                      name="conta"
                      value={formularioAlteracao.conta}
                      onClick={pegarValorAlteracao}
                      onChange={pegarValorAlteracao}
                      isInvalid={errosAlteracao.conta}
                      >
                      {contas.map((item) => (
                        <option 
                          key={item.id} 
                          value={item.id}
                          >
                            {item.descricao}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                  </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={fecharModalAlterar}>
                CANCELAR
              </Button>
              <Button variant="primary" onClick={alterarReceita}>
                ALTERAR
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
  );
}

export default Receitas;