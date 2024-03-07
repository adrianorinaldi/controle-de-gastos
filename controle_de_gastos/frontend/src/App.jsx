import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Index from "./pages/Home"
import CadastroContas from './components/Cadastros/Contas';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    children: [
      {
      path: "/contas",
      element: <CadastroContas />
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
