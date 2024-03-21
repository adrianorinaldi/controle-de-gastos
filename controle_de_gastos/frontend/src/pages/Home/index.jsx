import { Nav } from 'react-bootstrap';
import './styles.css';
import { Outlet } from 'react-router-dom';

function Index() {
  return (
    <div className='tela-toda'>
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
  );
}

export default Index;