/* eslint-disable react/prop-types */

const Card = ({jugadores,partido}) => {

    console.log(jugadores);
    console.log(partido);

  return (
   <>
   
   <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto h-full">
  <h2 className="text-xl font-bold mb-4 text-center">Detalles del Juego</h2>
  
  {/* Detalles del Juego */}
  <div className="mb-6 text-center">
    <p className="text-gray-700"><span className="font-semibold">ID:</span> {partido.id}</p>
    <p className="text-gray-700"><span className="font-semibold">Hora:</span> {partido.jugadores[0].hora}</p>
    <p className="text-gray-700"><span className="font-semibold">Total de Jugadores:</span> {partido.totalJugadores}</p>
    <p className="text-gray-700"><span className="font-semibold">Lado Ganador:</span> {partido.ganador}</p>
    <p className="text-gray-700"><span className="font-semibold">Ubicacion:</span> {partido.lugar}</p>
    <p className="text-gray-700"><span className="font-semibold">Precio Total:</span> ${partido.precioTotal}</p>
    <p className="text-gray-700"><span className="font-semibold">Precio Individual:</span>${(partido.precioTotal)/(partido.totalJugadores)}</p>

  </div>

  {/* Sección de Jugadores */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {/* Lado 0 */}
    <div className="bg-gray-50 rounded-md p-4">
      <h3 className="text-lg font-semibold mb-2 text-center">Lado 0</h3>
      {jugadores
        .filter((jugador) => jugador.lado === 0)
        .map((jugador, index) => (
          <ul key={index} className="mb-4">
            <li className="text-gray-700 mb-2">
              <span className="font-semibold">Nombre:</span> {jugador.nombre}
            </li>
            <li className="text-gray-700">
              <span className="font-semibold">Número:</span> {jugador.numero}
            </li>
          </ul>
        ))}
    </div>

    {/* Lado 1 */}
    <div className="bg-gray-50 rounded-md p-4">
      <h3 className="text-lg font-semibold mb-2 text-center">Lado 1</h3>
      {jugadores
        .filter((jugador) => jugador.lado === 1)
        .map((jugador, index) => (
          <ul key={index} className="mb-4">
            <li className="text-gray-700 mb-2">
              <span className="font-semibold">Nombre:</span> {jugador.nombre}
            </li>
            <li className="text-gray-700">
              <span className="font-semibold">Número:</span> {jugador.numero}
            </li>
          </ul>
        ))}
    </div>
  </div>
</div>


</>
  )
}

export default Card