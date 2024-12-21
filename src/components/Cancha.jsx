/* eslint-disable react/prop-types */
import { useState } from "react";
import canchaimg from "../assets/cancha.jpg";

import canchaimg1 from "../assets/cancha1.jpg";

// eslint-disable-next-line react/prop-types
const Cancha = ({ jugadoresIniciales, moverJugador, lado,hexadecimal,hexadecimal1 }) => {
  const [arrastrando, setArrastrando] = useState(null);

  const iniciarArrastre = (index) => {
    setArrastrando(index);
  };

  const mover = (event) => {
    if (arrastrando === null) return;

    const cancha = event.target.closest(".cancha");
    const rect = cancha.getBoundingClientRect();

    const x = ((event.clientX - rect.left) / rect.width) * 95;
    const y = ((event.clientY - rect.top) / rect.height) * 86;

    moverJugador(lado, arrastrando, x, y);
  };

  const finalizarArrastre = () => {
    setArrastrando(null);
  };

  return (
    <div
      className={`relative w-full  mx-auto mt-2 aspect-video  border-white rounded-lg cancha`}
      onMouseMove={mover}
      onMouseUp={finalizarArrastre}
      onMouseLeave={finalizarArrastre}
      style={{
        backgroundImage: `url(${lado === 1 ? canchaimg : canchaimg1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {jugadoresIniciales.map((jugador, index) => (
       <div
       key={index}
       className={`absolute  text-xs font-bold rounded-full w-[120px] h-10 flex items-center justify-center cursor-pointer text-black`}
       style={{
         top: jugador.y,
         left: jugador.x,
         background: jugador.lado === 1 
           ? `linear-gradient(to right, ${hexadecimal} 50%, ${hexadecimal1} 50%)`  // Azul dividido
           : `linear-gradient(to right, ${hexadecimal} 50%, ${hexadecimal1} 50%)`, // Rojo dividido
       }}
       title={jugador.nombre}
       onMouseDown={() => iniciarArrastre(index)}
     >
       {<p className="drop-shadow-[0_0_1px_white]">{jugador.nombre}</p>}
        </div>
      ))}
    </div>
  );
};

export default Cancha;
