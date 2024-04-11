import { Nav } from 'react-bootstrap';
import './styles.css';
import { Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { React, useState, useEffect } from 'react';


function Index() {

  const [sistemaFora, setSistemaFora] = useState(true);

  useEffect(() => {
    buscarTesteDeConexao();
  }, []);

  const buscarTesteDeConexao = async (event) => {
    try {
      const response = await axios.get(`http://localhost:8080/teste/teste_de_conexao`);
      setSistemaFora(false);
    } catch (error) {
      console.error('Erro:', error);
      setSistemaFora(true);
    }
  }

  return (
    <div className='tela-toda'>
      {sistemaFora === true ? 
        <div className="sistema-fora">
          <h1>Sistema fora do ar...</h1>
        </div>
       : 
       <div>
         <div className='cabecalho'>
           cabecalho
         </div>
         <div className='linha-central'>
           <div className='menu-lateral'>
             <Nav defaultActiveKey="inicio" className="flex-column">
               <Nav.Item>
                 <Nav.Link eventKey="inicio" href="/inicio">
                     INICIO
                 </Nav.Link>
               </Nav.Item>
               <Nav.Item>
                 <Nav.Link eventKey="inicio" href="/receitas">
                     RECEITAS
                 </Nav.Link>
               </Nav.Item>
               <Nav.Item>
                 <Nav.Link eventKey="inicio" href="/despesas">
                     DESPESAS
                 </Nav.Link>
               </Nav.Item>
               <Nav.Item>
                 <Nav.Link eventKey="contas" href="/contas">
                     CONTAS
                 </Nav.Link>
               </Nav.Item>
               <Nav.Item>
                 <Nav.Link eventKey="categorias" href="/categorias">
                     CATEGORIAS
                 </Nav.Link>
               </Nav.Item>
             </Nav>
           </div>
           <div className='corpo'>
             <Outlet/>
           </div>
         </div>
      </div>
      }
    </div>
  );
}

export default Index;