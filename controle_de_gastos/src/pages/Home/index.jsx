import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './styles.css';
import MenuLateral from '../../components/MenuLateral';
import { Outlet } from 'react-router-dom';

function Index() {
  return (
    <Container fluid>
      <Row>
        <Col className='cabecalho'>cabecalho</Col>
      </Row>
      <Row>
        <Col xs={3} md={3} className='menu-lateral'>
          <MenuLateral />
        </Col>
        <Col className='corpo'>
            <Outlet/>
        </Col>
      </Row>
    </Container>
  );
}

export default Index;