import Nav from 'react-bootstrap/Nav';
import './styles.css';

function MenuLateral() {
  return (
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
  );
}

export default MenuLateral;