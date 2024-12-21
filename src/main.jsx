import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider, } from 'react-router-dom';
import Mainpage from "./Mainpage.jsx";
import Historial from './Historial.jsx';



function Root() {
  const [teamCant, setteamCant] = useState(5);
  const [idcarga, setidcarga] = useState("")
  
  const router = createBrowserRouter([
    {
      path: '/Inicio',
      element: <App setteamCant={setteamCant} teamCant={teamCant} setidcarga={setidcarga}  idcarga={idcarga}/>,
    },
    {
      path: '/equipo',
      element: <Mainpage teamCant={teamCant} idcarga={idcarga}  setteamCant={setteamCant} />,
    },
    {
      path: '/historial',
      element: <Historial />,
    },
    {
      path: '/',
      element: <App setteamCant={setteamCant} teamCant={teamCant} setidcarga={setidcarga}  idcarga={idcarga}/>,
    },
   
  ]);

  return <RouterProvider router={router} />;
}


createRoot(document.getElementById('root')).render(
  <StrictMode>

      <Root />
   
  </StrictMode>,
)
