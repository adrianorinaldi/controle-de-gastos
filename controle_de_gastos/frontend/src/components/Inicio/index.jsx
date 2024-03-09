import { Button, Form, Table } from 'react-bootstrap';
import './styles.css';

function Inicio () {

  return (
    <div >
      <div className='saldo'>
        <div>
          <Form.Label htmlFor="saldo">SALDO</Form.Label>
        </div>
        <div>
          <Form.Control
            type="text"
            id="saldo"
            aria-describedby="passwordHelpBlock"
            defaultValue={"R$ 5.000,00"}
          />
        </div>
      </div>
      <div className='receita-despesa'>
        <div className='receita'>
          <div>
            <Form.Label htmlFor="receita">RECEITA</Form.Label>
          </div>
          <div>
            <Form.Control
              type="text"
              id="receita"
              aria-describedby="passwordHelpBlock"
              defaultValue={"R$ 12.000,00"}
            />
          </div>
        </div>
        <div className='despesa'>
          <div>
            <Form.Label htmlFor="despesa">DESPESA</Form.Label>
          </div>
          <div>
            <Form.Control
              type="text"
              id="despesa"
              aria-describedby="passwordHelpBlock"
              defaultValue={"R$ 4.000,00"}
            />
          </div>
        </div>
      </div>
      <hr></hr>
     
    </div>
  );
}

export default Inicio;