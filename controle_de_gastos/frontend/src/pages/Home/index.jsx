import Nav from 'react-bootstrap/Nav';
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
              <Nav.Link eventKey="inicio" href="/">
                  INICIO
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="cadastros" disabled>
                  CADASTROS
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