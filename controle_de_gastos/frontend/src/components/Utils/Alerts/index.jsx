import { React } from 'react';
import { toast } from 'react-toastify';
import './styles.css';
import 'react-toastify/dist/ReactToastify.css';

function Alerta ({mensagem}) {
    const notify = () => toast({mensagem});
    return notify;
}

export default Alerta;