import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Index from "./pages/Home"
import CadastroContas from './components/Cadastros/Contas';
import CadastroCategorias from './components/Cadastros/Categorias';
import Inicio from './components/Inicio';
import Receitas from './components/Cadastros/Receitas';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    children: [
      {
      path: "/contas",
      element: <CadastroContas />
      },
      {
        path: "/categorias",
        element: <CadastroCategorias />
      },
      {
        path: "/inicio",
        element: <Inicio />
      },
      {
        path: "/receitas",
        element: <Receitas />
      }
    ]
  },
]);

function App() {

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
