import { Button, Form, Table, Modal } from "react-bootstrap";
import "./styles.css";
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import { format } from 'date-fns';
// Registre o idioma para que o DatePicker o utilize
registerLocale('pt-BR', ptBR);

function despesas () {
  const [mostrar, setMostrar] = useState(false);
  const fechar = () => setMostrar(false);
  const [totalDespesa, setTotalDespesa] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [contas, setContas] = useState([]);
  const [despesas, setDespesas] = useState([]);
  const [formulario, setFormulario] = useState({
    valor: '',
    categoria: '',
    descricao: '',
    data: '',
    conta: ''
  });
  const dataAtual = new Date();
  const dia = String(dataAtual.getDate()).padStart(2, '0');
  const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
  const ano = dataAtual.getFullYear();
  const data_atual = `${dia}/${mes}/${ano}`
  const [dataSelecionada, setDataSelecionada] = useState(null);
    // Defina o idioma padrão para o DatePicker
    setDefaultLocale(ptBR);

  const abrirModalCadastrar = () => {
    setFormulario({ ...formulario, 'valor': '', 'descricao': '', 'data': ''});
    setMostrar(true);
  };

  const pegarValor = async (event) => {
    const { name, value } = event.target;
    setFormulario({ ...formulario, [name]: value });
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

  const salvarDespesa = async (event) => {
    event.preventDefault();

    //setFormulario({ ...formulario, 'data': format(dataSelecionada, 'dd/MM/yyyy') });
    console.log(formulario);

    try {
      const response = await axios.post('http://localhost:8080/despesa/salvar', formulario);

      if (response.status === 201) {
        console.log('Conta Cadastrada com sucesso!');
        buscarTodasDespesas();
        fechar();
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
            aria-describedby="passwordHelpBlock"
            defaultValue={totalDespesa.toLocaleString('pt-BR')}
          />
        </div>
      </div>
      <hr></hr>
      <div className="quadro-despesas">
          <div>
            <Modal scrollable="true" show={mostrar} onHide={fechar}>
              <Modal.Header closeButton>
                <Modal.Title>ADICIONAR DESPESA</Modal.Title>
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
                <Button variant="secondary" onClick={fechar}>
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
                      X
                    </Button>
                  </td>
                </tr>
                ))}
            </tbody>
            </Table>
          </div>
        </div>
      </div>
  );
}

export default despesas;