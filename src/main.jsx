import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./css/style.css"
import 'bootstrap/dist/css/bootstrap.css';
import Carteirinha from './routes/CarteirinhaRoute.jsx';
import Consulta from './routes/ConsultaRoute.jsx';
import Medico from './routes/MedicoRoute.jsx';
import Paciente from './routes/PacienteRoute.jsx';
import { createBrowserRouter, RouterProvider} from "react-router-dom";

const routes =createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "carteirinha",
    element: <Carteirinha />
  },
  {
    path: "consulta",
    element: <Consulta />
  },
  {
    path: "medico",
    element: <Medico />
  },
  {
    path: "paciente",
    element: <Paciente />
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>,
)
