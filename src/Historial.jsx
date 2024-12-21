import axios from "axios";
import Card from "./components/Card";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";

const Historial = () => {
  const [partidos, setPartidos] = useState([]); // Inicializa como un array vacío

  useEffect(() => {
    axios
      .get(`http://localhost:3000/historial`)
      .then((response) => {
        // Asegúrate de acceder a la propiedad 'historial' del objeto
        const data = Array.isArray(response.data.historial) ? response.data.historial : [];
        setPartidos(data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  return (
    <>
    <header>
      <Navbar/>
    </header>
     {Array.isArray(partidos) && partidos.length > 0 ? (
  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 mx-8 gap-8 mt-6"> {/* Cambiado a "grid-cols-1" */}
    {partidos.map((partido, index) => (
      <div key={index}>
        <Card partido={partido} jugadores={partido.jugadores} />
      </div>
    ))}
  </div>
) : (
  <p className="text-center text-gray-500">No hay partidos disponibles.</p>
)}

    </>
  );
};

export default Historial;
