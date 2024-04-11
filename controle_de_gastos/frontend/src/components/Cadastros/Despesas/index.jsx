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

function despesas () {
  const [mostrarModalCadastro, setMostrarModalCadastro] = useState(false);
  const fecharModalCadastro = () => setMostrarModalCadastro(false);
  const [mostrarModalAlterar, setMostrarModalAlterar] = useState(false);
  const [totalReceita, setTotalDespesa] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [contas, setContas] = useState([]);
  const [despesas, setDespesas] = useState([]);
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
    setFormularioAlteracao({ ...formularioAlteracao, [name]: value });
  };

  const pegarValorDeData = (date) => {
    setDataSelecionada(date);
    setFormulario({ ...formulario, 'data': format(date, 'dd/MM/yyyy') });
  };

  const pegarValorDeDataAlteracao = (date) => {
    setDataSelecionadaAlteracao(date);
    setFormularioAlteracao({ ...formularioAlteracao, 'data': format(date, 'dd/MM/yyyy') });
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
    buscarTotalDespesa();
    buscarTodasDespesas();
  }, []);

  
  const abrirModalCadastrar = () => {
    setMostrarModalCadastro(true);
    setDataSelecionada(dataAtual);
    setFormulario({ ...formulario, id: '', valor: '', descricao: '', data: format(dataAtual, 'dd/MM/yyyy')});
  };

  const buscarTotalDespesa = async (event) => {
    try {
      const response = await axios.get(`http://localhost:8080/despesa/buscar_total_despesa`);
      setTotalDespesa(response.data);
    } catch (error) {
      console.error('Erro:', error);
      toast.error("Erro ao tentar buscar total da despesa!");
    }
  } 

  const buscarCategorias = async (event) => {
    try {
      const response = await axios.get('http://localhost:8080/categoria/buscar_categoria_despesas');
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

  const buscarTodasDespesas = async (event) => {
    try {
      const response = await axios.get('http://localhost:8080/despesa/buscar_todas');
      setDespesas(response.data);
      buscarTotalDespesa();
    } catch (error) {
      console.error('Erro:', error);
      toast.error("Erro ao tentar buscar todas as receitas!");
    }
  };

  const salvarDespesa = async (event) => {
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
      const response = await axios.post('http://localhost:8080/despesa/salvar', formulario);
      if (response.status === 201) {
        console.log('Despesa Cadastrada com sucesso!');
        toast.success("Despesa Cadastrada com sucesso!");
        buscarTodasDespesas();
        fecharModalCadastro();
      } else {
        console.error('Erro ao enviar os dados.' + response);
        toast.error("Erro ao tentar cadastrar despesa!");
      }
    } catch (error) {
      console.error('Erro:', error);
      toast.error("Erro ao tentar cadastrar despesa!");
    }
  };

  const excluirDespesa = async (id) => {
      try {
        const response = await axios.delete(`http://localhost:8080/despesa/deletar/${id}`);
        if(response) {
          console.log("excluiu");
          toast.success("Despesa Excluída com sucesso!");
          buscarTodasDespesas();
        } else {
          console.log("Não excluiu");
          toast.error("Erro ao tentar excluir despesa!");
        }
      } catch (error) {
        console.error('Erro:', error);
        toast.error("Erro ao tentar excluir despesa!");
      }
  };

  const abrirTelaAlterarDespesa = (idDespesa, idCategoria, valorDespesa, descricaoDespesa, dataDespesa, idConta) => {
    setMostrarModalAlterar(true);
    setDataSelecionadaAlteracao(dataDespesa);
    setFormularioAlteracao({ ...formularioAlteracao, id: idDespesa, 
                                                     valor: valorDespesa, 
                                                     categoria: idCategoria,
                                                     descricao: descricaoDespesa,
                                                     data: format(dataDespesa, 'dd/MM/yyyy'),
                                                     conta: idConta
                                                    });
  };

  const alterarDespesa = () => {
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
    salvarAlteracaoDespesa();
    fecharModalAlterar();
  };

  const salvarAlteracaoDespesa = async (event) => {
    try {
      const response = await axios.post('http://localhost:8080/despesa/salvar', formulario);
      if (response.status === 201) {
        console.log('Despesa Alterada com sucesso!');
        toast.success("Despesa Alterada com sucesso!");
        formulario.descricao = '';
        buscarTodasDespesas();
      } else {
        console.error('Erro ao enviar os dados.' + response);
        toast.error("Erro ao tentar alterar despesa!");
      }
    } catch (error) {
      console.error('Erro:', error);
      toast.error("Erro ao tentar alterar despesa!");
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
      <div className='despesas'>
        <div>
          <Form.Label htmlFor="despesas">despesas</Form.Label>
        </div>
        <div>
          <Form.Control
            type="text"
            id="despesas"
            className="text-center"
            aria-describedby="passwordHelpBlock"
            defaultValue={totalReceita}
          />
        </div>
      </div>
      <hr></hr>
      <div className="quadro-despesas">
          <div>
            <Modal scrollable="true" show={mostrarModalCadastro} onHide={fecharModalCadastro}>
              <Modal.Header closeButton>
                <Modal.Title>ADICIONAR despesa</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={salvarDespesa}>
                  <Form.Group className="mb-1">
                    <Form.Label>Valor</Form.Label>
                    <Form.Control 
                      type="number" 
                      placeholder="Digite o valor" 
                      name="valor"
                      value={formulario.valor}
                      onChange={pegarValor}
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
                      className="form-control" 
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
                <Button variant="primary" onClick={salvarDespesa}>
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
          <div className='tabela-despesas'>
            <Table size="sm" striped bordered hover>
              <thead>
                <tr>
                  <th>dia</th>
                  <th>descrição</th>
                  <th>categoria</th>
                  <th>conta</th>
                  <th>valor</th>
                </tr>
              </thead>
              <tbody>
              {despesas.map((item) => (
                <tr key={item.id}>
                  <td>{format(item.data, 'dd/MM/yyyy')}</td>
                  <td>{item.descricao}</td>
                  <td>{item.idCategoria}</td>
                  <td>{item.categoria}</td>
                  <td>{item.valor.toLocaleString('pt-BR')}</td>
                  <td>{item.idConta}</td>
                  <td>{item.conta}</td>
                  <td>
                    <Button variant="danger" onClick={() => excluirDespesa(item.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                    <Button variant="info" onClick={() => abrirTelaAlterarDespesa(item.id, item.idConta, item.valor, item.descricao, item.data, item.idConta)}>
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
              <Modal.Title>ALTERAR despesa</Modal.Title>
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
                      className="form-control" 
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
              <Button variant="primary" onClick={alterarDespesa}>
                ALTERAR
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
  );
}

export default despesas;