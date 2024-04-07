import { Button, Form, Table, Modal } from "react-bootstrap";
import "./styles.css";
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import { format } from 'date-fns';
// Registre o idioma para que o DatePicker o utilize
registerLocale('pt-BR', ptBR);

function despesas () {
  const [mostrarModalCadastro, setMostrarModalCadastro] = useState(false);
  const fecharModalCadastro = () => setMostrarModalCadastro(false);
  const [mostrarModalAlterar, setMostrarModalAlterar] = useState(false);
  const fecharModalAlterar = () => setMostrarModalAlterar(false);
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
  const dataAtual = new Date();
  const [dataSelecionada, setDataSelecionada] = useState(null);
    // Defina o idioma padrão para o DatePicker
    setDefaultLocale(ptBR);

  const abrirModalCadastrar = () => {
    setMostrarModalCadastro(true);
    setDataSelecionada(dataAtual);
    setFormulario({ ...formulario, id: '', valor: '', descricao: '', data: format(dataAtual, 'dd/MM/yyyy')});
  };

  const pegarValor = async (event) => {
    const { name, value } = event.target;
    setFormulario({ ...formulario, [name]: value });
    console.log({...formulario});
  };

  const pegarValorDeData = (date) => {
    setDataSelecionada(date);
    setFormulario({ ...formulario, 'data': format(date, 'dd/MM/yyyy') });
  };

  useEffect(() => {
    buscarTotalDespesa();
    buscarTodasDespesas();
  }, []);

  const buscarTotalDespesa = async (event) => {
    try {
      const response = await axios.get(`http://localhost:8080/despesa/buscar_total_despesa`);
      setTotalDespesa(response.data);

    } catch (error) {
      console.error('Erro:', error);
    }
  } 

  const buscarCategorias = async (event) => {
    try {

      const response = await axios.get('http://localhost:8080/categoria/buscar_categoria_despesas');
      setCategorias(response.data);

    } catch (error) {
      console.error('Erro:', error);
    }
  } 

  const buscarContas = async (event) => {
    try {

      const response = await axios.get('http://localhost:8080/conta/buscar_todas');
      setContas(response.data);

    } catch (error) {
      console.error('Erro:', error);
    }
  } 

  const buscarTodasDespesas = async (event) => {
    try {
      const response = await axios.get('http://localhost:8080/despesa/buscar_todas');
      console.log(response.data);
      setDespesas(response.data);
      buscarTotalDespesa();
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const abrirTelaAlterarDespesa = (idDespesa, valorDespesa, descricaoDespesa, dataDespesa) => {
    setMostrarModalAlterar(true);
    setDataSelecionada(dataDespesa);
    setFormulario({ ...formulario, 'id': idDespesa, 
                                   'valor': valorDespesa, 
                                   'descricao': descricaoDespesa,
                                   'data': format(dataDespesa, 'dd/MM/yyyy')
                                  });
  };

  const salvarDespesa = async (event) => {
    event.preventDefault();

    console.log(formulario);

    try {
      const response = await axios.post('http://localhost:8080/despesa/salvar', formulario);

      if (response.status === 201) {
        console.log('Conta Cadastrada com sucesso!');
        buscarTodasDespesas();
        fecharModalCadastro();
      } else {
        console.error('Erro ao enviar os dados.' + response);
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const excluirDespesa = async (id) => {
        
    console.log("depois="+id);

      try {
        const response = await axios.delete(`http://localhost:8080/despesa/deletar/${id}`);

        if(response) {
          console.log("excluiu");
          buscarTodasDespesas();
        } else {
          console.log("Não excluiu");
        }
      } catch (error) {
        console.error('Erro:', error);
      }
  };

  const alterarDespesa = () => {
    salvarAlteracaoDespesa();
    setMostrarModalAlterar(false);
  };

  const salvarAlteracaoDespesa = async (event) => {

    console.log(formulario);

    try {
      const response = await axios.post('http://localhost:8080/despesa/salvar', formulario);

      if (response.status === 201) {
        console.log('Conta Alterada com sucesso!');
        formulario.descricao = '';
        buscarTodasDespesas();
      } else {
        console.error('Erro ao enviar os dados.' + response);
      }
    } catch (error) {
      console.error('Erro:', error);
    }
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
                      className="campo-obrigatorio"
                      required
                      />
                  </Form.Group>
                  <Form.Group className="mb-1" onClick={buscarCategorias}>
                    <Form.Label>Categoria</Form.Label>
                    <Form.Select 
                      name="categoria"
                      value={formulario.categoria}
                      onClick={pegarValor}
                      onChange={pegarValor}
                      className="campo-obrigatorio"
                      required
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
                      required
                      />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Data</Form.Label>
                    <br></br>
                    <DatePicker
                      showIcon
                      toggleCalendarOnIconClick
                      locale="pt-BR"
                      //defaultValue={data_atual}
                      selected={dataSelecionada}
                      onChange={pegarValorDeData}
                      dateFormat="dd/MM/yyyy" 
                      className="form-control campo-obrigatorio" 
                      name="data"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-1" onClick={buscarContas}>
                    <Form.Label>Conta</Form.Label>
                    <Form.Select 
                      name="conta"
                      value={formulario.conta}
                      onClick={pegarValor}
                      onChange={pegarValor}
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
                  <th>valor</th>
                </tr>
              </thead>
              <tbody>
              {despesas.map((item) => (
                <tr key={item.id}>
                  <td>{format(item.data, 'dd/MM/yyyy')}</td>
                  <td>{item.descricao}</td>
                  <td>{item.categoria}</td>
                  <td>{item.valor.toLocaleString('pt-BR')}</td>
                  <td>
                    <Button variant="danger" onClick={() => excluirDespesa(item.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                    <Button variant="info" onClick={() => abrirTelaAlterarDespesa(item.id, item.valor, item.descricao, item.data)}>
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
                      value={formulario.valor}
                      onChange={pegarValor}
                      className="campo-obrigatorio"
                      required
                      />
                  </Form.Group>
                  <Form.Group className="mb-1" onClick={buscarCategorias}>
                    <Form.Label>Categoria</Form.Label>
                    <Form.Select 
                      name="categoria"
                      value={formulario.categoria}
                      onClick={pegarValor}
                      onChange={pegarValor}
                      className="campo-obrigatorio"
                      required
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
                      required
                      />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Data</Form.Label>
                    <br></br>
                    <DatePicker
                      showIcon
                      toggleCalendarOnIconClick
                      locale="pt-BR"
                      //defaultValue={data_atual}
                      selected={dataSelecionada}
                      onChange={pegarValorDeData}
                      dateFormat="dd/MM/yyyy" 
                      className="form-control campo-obrigatorio" 
                      name="data"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-1" onClick={buscarContas}>
                    <Form.Label>Conta</Form.Label>
                    <Form.Select 
                      name="conta"
                      value={formulario.conta}
                      onClick={pegarValor}
                      onChange={pegarValor}
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