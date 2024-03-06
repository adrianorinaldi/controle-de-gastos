import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Index from "./pages/Home"

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Index />
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
