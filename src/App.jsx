import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useEffect } from "react";



// eslint-disable-next-line react/prop-types
function App({setteamCant,teamCant,setidcarga,idcarga}) {

  const navigate = useNavigate();
  const handleConfirm = () => {
    setidcarga("")
    console.log("Cantidad de equipos:", teamCant); // Aquí procesas el valor
    navigate("/equipo")
  };

  const handleConfirm0 = () => {
    console.log("Cantidad de equipos:", teamCant); // Aquí procesas el valor
    
    navigate("/equipo")
  };

useEffect(() => {
  setteamCant(5)
  setidcarga("")
}, [])


  return (
    <>
    <header><Navbar/></header>
    <div className="flex items-center justify-center min-h-screen bg-gray-700">
  <div className="space-y-6">
    {/* Contenedor para cada sección */}
    <div className="bg-slate-500 p-6 rounded-lg shadow-md">
      <label className="block mb-4 text-2xl font-semibold text-white" htmlFor="">
        Ingrese cantidad de equipos
      </label>
      <input
        value={teamCant}
        onChange={(e) => setteamCant(e.target.value)}
        className="w-full px-4 py-2 mb-4 text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        type="text"
      />
      <div className="text-center">
        <button
          className="px-6 py-2 text-xl font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          onClick={handleConfirm}
        >
          Confirmar
        </button>
      </div>
    </div>

    <div className="bg-slate-500 p-6 rounded-lg shadow-md">
      <label className="block mb-4 text-2xl font-semibold text-white" htmlFor="">
        Ingrese id equipo
      </label>
      <input
        value={idcarga}
        onChange={(e) => setidcarga(e.target.value)}
        className="w-full px-4 py-2 mb-4 text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        type="text"
      />
      <div className="text-center">
        <button
          className="px-6 py-2 text-xl font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          onClick={handleConfirm0}
        >
          Confirmar
        </button>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default App
