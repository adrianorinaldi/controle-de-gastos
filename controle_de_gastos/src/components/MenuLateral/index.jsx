import Nav from 'react-bootstrap/Nav';
import './styles.css';

function MenuLateral() {
  return (
    <Nav defaultActiveKey="inicio" className="flex-column">
      <Nav.Item>
        <Nav.Link eventKey="inicio" href="/home">
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
  );
}

export default MenuLateral;