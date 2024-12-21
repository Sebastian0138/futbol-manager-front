import { useEffect, useState } from "react";
import Cancha from "./components/Cancha";

import axios from "axios";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";


// eslint-disable-next-line react/prop-types
function Mainpage({teamCant,idcarga,setteamCant}) {
  const [jugadoresLado1, setJugadoresLado1] = useState([]);
  const [jugadoresLado0, setJugadoresLado0] = useState([]);
  //const [hexadecimal, sethexadecimal] = useState("$FFFFFF")
  //const [hexadecimal0, sethexadecimal0] = useState("$FFFFFF")
  const [color, setColor] = useState('#0000ff'); 
  const [color0, setColor0] = useState('#ff0000'); 
  const [colorB, setColorB] = useState('#0000ff'); 
  const [color0B, setColor0B] = useState('#ff0000');
  const [gollado1, setgollado1] = useState(0)
  const [gollado0, setgollado0] = useState(0)
  const [nuevoJugadorLado1, setNuevoJugadorLado1] = useState("");
  const [nuevoJugadorLado0, setNuevoJugadorLado0] = useState("");
  const [text, settext] = useState("")
  const [id, setid] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hora, sethora] = useState("00:00")
  const [precioTotal, setprecioTotal] = useState(0)


    useEffect(() => {
     if(gollado0<0 ||gollado1<0){

      alert("Los goles no pueden ser negativos")
      if(gollado0<0){
        setgollado0(gollado0+1)
      }
      if(gollado1<0){
        setgollado1(gollado1+1)
      }
     }
    }, [gollado0 || gollado1])
    

    useEffect(() => {
   
    }, [color || color0])
    

    useEffect(() => {
      if(jugadoresLado1.length > teamCant || jugadoresLado0.length >teamCant){
        console.log(jugadoresLado1.length )
        alert("Error mas jugadores de los que debe haber en el equipo")
        if(jugadoresLado1.length > teamCant){
            eliminarUltimo();
        }

        if(jugadoresLado0.length > teamCant){
            eliminarUltimo0();
        }
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [jugadoresLado1 || jugadoresLado0])
    
    useEffect(() => {
      
      
      setJugadoresLado1(prevJugadores =>
        prevJugadores.map(jugador => ({
          ...jugador, // Conserva el resto de las propiedades
          hora: hora, // Actualiza solo la propiedad 'hora'
        }))
      );


      setJugadoresLado0(prevJugadores =>
        prevJugadores.map(jugador => ({
          ...jugador, // Conserva el resto de las propiedades
          hora: hora, // Actualiza solo la propiedad 'hora'
        }))
      );
    }, [hora])
    
    useEffect(() => {
      setJugadoresLado1(prevJugadores =>
        prevJugadores.map(jugador => ({
          ...jugador, // Conserva el resto de las propiedades
          color: color,
          colorSecundario: colorB,
        }))
      );
    
      setJugadoresLado0(prevJugadores =>
        prevJugadores.map(jugador => ({
          ...jugador, // Conserva el resto de las propiedades
          color: color0,
          colorSecundario: color0B,
        }))
      );
    }, [color, color0, color0B, colorB]); // Dependencias separadas
    


    useEffect(() => {
      if (idcarga) {
        axios.get(`http://localhost:3000/partidos/${idcarga}`)
          .then(response => {
            console.log(response.data.jugadores)
            const res = response.data.jugadores
            const lado1Data = res.filter(item => item.lado === 1);
            const lado0Data = res.filter(item => item.lado === 0);
            
            setteamCant(lado1Data.length)
            // Actualizamos el estado con los resultados filtrados
            setJugadoresLado1(lado1Data);  // Jugadores en el lado 1
            setJugadoresLado0(lado0Data);  // Jugadores en el lado 0
            sethora(res[0].hora)
            setprecioTotal(response.data.precioTotal)
            const rescolor = res.filter(col =>col.lado ===1)
            const rescolor0 = res.filter(col =>col.lado ===0)
            console.log(rescolor);
            
            setColor(rescolor[0].color)
            setColorB(rescolor[0].colorSecundario)
            setColor0(rescolor0[0].color)
            setColor0B(rescolor0[0].colorSecundario)

            console.log(rescolor.color);
            
          })
          .catch(err => {
            console.log(err);
          });
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 
    

  


  const enviarEquipos = async () => {
    const jugadores = jugadoresLado0.concat(jugadoresLado1);  // Unir ambos arrays
    console.log(idcarga);
    var ganador=""
    const lugar = "Caballito Norte"
    
    if(jugadores.length<=0){

      alert("No se puede crear sin jugadores un partido.")

    }

    if(gollado1==gollado0){

      ganador = "Empate";
    }else if(gollado1>=gollado0){

      ganador = "Lado 1"

    }else if(gollado1<=gollado0){

      ganador = "Lado 0"

    }

    try {
        const response = await axios.post('http://localhost:3000/partidos', {
            jugadores,idcarga,ganador,lugar,precioTotal,color,color0,color0B,colorB  // Enviar los jugadores como un array en el cuerpo de la solicitud
        });

        console.log('Partido creado con éxito:', response.data);

        
       

        settext(response.data.message)
        console.log(response.data.id);
        setid(response.data.id)
        setIsModalOpen(true)
        console.log(isModalOpen);
       
    } catch (error) {
        console.error('Error al crear el partido:', error.response ? error.response.data : error.message);
    }
};


  const agregarJugadorLado1 = () => {
   
    if (nuevoJugadorLado1.trim()) {
      setJugadoresLado1((prev) => [
        ...prev,
        {
          nombre: nuevoJugadorLado1,
          numero: prev.length + 1,
          x: "50%",
          y: "50%",
          lado: 1,
          hora:hora,
          color:color,
          colorSecundario:colorB
        },
      ]);
      setNuevoJugadorLado1("");
    }
  };

  const agregarJugadorLado0 = () => {
    
    if (nuevoJugadorLado0.trim()) {
      setJugadoresLado0((prev) => [
        ...prev,
        {
          nombre: nuevoJugadorLado0,
          numero: prev.length + 1,
          x: "50%",
          y: "50%",
          lado: 0,
          hora:hora,
          color:color0,
          colorSecundario:color0B
        },
      ]);
      setNuevoJugadorLado0("");
    }
  };

  const moverJugador = (lado, index, x, y) => {
    if (lado === 1) {
      setJugadoresLado1((prev) =>
        prev.map((jugador, i) =>
          i === index ? { ...jugador, x: `${x}%`, y: `${y}%` } : jugador
        )
      );
    } else {
      setJugadoresLado0((prev) =>
        prev.map((jugador, i) =>
          i === index ? { ...jugador, x: `${x}%`, y: `${y}%` } : jugador
        )
      );
    }
  };

  const eliminarUltimo = () => {
    setJugadoresLado1((prevItems) => prevItems.slice(0, -1));
  };

  const eliminarUltimo0 = () => {
    setJugadoresLado0((prevItems) => prevItems.slice(0, -1));
  };

  return (<>
  {/*
  <div className="flex bg-gray-200 flex-row justify-center  w-[100%] pb-2 ">
    <div className="flex flex-col  ">

    <label htmlFor="hora">Ingresar horario</label>
      <input
        id="hora"
        type="time"
        value={hora}
        onChange={(e) => sethora(e.target.value)} // Actualiza el estado con la hora seleccionada
      />
      <button onClick={handleConfirmarHora}>
        Confirmar hora
      </button>
    </div>
  </div>
  
  */}
<Navbar/>

  
    <div className="flex w-full flex-row bg-gray-100 justify-evenly pt-2">
    <div className="flex flex-col w-[40%]">
            <div className="flex flex-row justify-center pb-2">

                <label htmlFor="" className="border-4 p-2 rounded-2xl">Agregar jugadores</label>
            </div>
            <div className="flex flex-row justify-center ">
                <input
                    type="text"
                    value={nuevoJugadorLado1}
                    onChange={(e) => setNuevoJugadorLado1(e.target.value)}
                    className="border p-2 w-[50%] rounded-2xl"
                    />
            </div>
               <div className="flex flex-row justify-center">

                    
                    <button  className=" bg-blue-500 w-[25%] rounded-2xl mt-2 py-2" onClick={agregarJugadorLado1}>Agregar</button>
                    <button  className="mx-2 p-[.7px] bg-blue-200 w-[25%] rounded-2xl mt-2" onClick={eliminarUltimo}>Eliminar ultimo</button>
          
               </div>
               <div className="flex flex-row justify-center">

                  <button  className=" bg-green-500 w-[25%] rounded-2xl mt-2 py-2  " onClick={()=>setgollado1(gollado1+1)}>Sumar Goles</button>
                  <button  className="mx-2 p-[.7px] bg-purple-200 w-[25%] rounded-2xl mt-2" onClick={()=>setgollado1(gollado1-1)}>Restar Goles</button>
                  

               </div>
               <div className="flex flex-row justify-center">
               <label className="text-4xl	" htmlFor=""> Goles : </label>
                  <h2 className="text-center text-4xl	">{gollado1}</h2>
               </div>
               
               <h2>Elige un color:</h2>
                <div className="flex flex-row">
                  <input
            type="color"
            value={color}
            onChange={e=>setColor(e.target.value)}
            style={{ width: '50px', height: '30px', border: 'none', cursor: 'pointer' }}
          />

          <input
            type="color"
            value={colorB}
            onChange={e=>setColorB(e.target.value)}
            style={{ width: '50px', height: '30px', border: 'none', cursor: 'pointer' }}
          />
               </div>
      
      
        </div> 
<div className="flex flex-col justify-center">

<label className="text-center" htmlFor="hora">Ingresar horario</label>
      <input
        id="hora"
        type="time"
        value={hora}
        onChange={(e) => sethora(e.target.value)} // Actualiza el estado con la hora seleccionada
      />
      
  <label className="text-center mt-2" htmlFor="">Ingrese Precio Total</label>  
  <input value={precioTotal} onChange={(e) =>setprecioTotal(e.target.value)} type="number" />

</div>

<div className="flex flex-col w-[40%]">
            <div className="flex flex-row justify-center pb-2">

                <label htmlFor="" className="border-4 p-2 rounded-2xl">Agregar jugadores</label>
            </div>
            <div className="flex flex-row justify-center ">
                <input
                    type="text"
                    value={nuevoJugadorLado0}
                    onChange={(e) => setNuevoJugadorLado0(e.target.value)}
                    className="border p-2 w-[50%] rounded-2xl"
                    />
            </div>
               
            <div className="flex flex-row justify-center">

                <button  className=" bg-red-500 w-[25%] rounded-2xl mt-2 py-2" onClick={agregarJugadorLado0}>Agregar</button>
                <button  className="mx-2 p-[1px] bg-red-200 w-[25%] rounded-2xl mt-2" onClick={eliminarUltimo0}>Eliminar ultimo</button>
                </div>

                <div className="flex flex-row justify-center">

                  <button  className=" bg-green-500 w-[25%] rounded-2xl mt-2 py-2" onClick={()=>setgollado0(gollado0+1)}>Sumar Goles</button>
                  <button  className="mx-2 p-[.7px] bg-purple-200 w-[25%] rounded-2xl mt-2" onClick={()=>setgollado0(gollado0-1)}>Restar Goles</button>
                  
               </div>    
               <div className="flex flex-row justify-center">
                <label htmlFor="" className="text-4xl"> Goles : </label>
                  <h2 className="text-center text-4xl"> {gollado0}</h2>
               </div>
               <h2>Elige un color:</h2>
               <div className="flex flex-row">
               <input
                  type="color"
                  value={color0}
                  onChange={e=>setColor0(e.target.value)}
                  style={{ width: '50px', height: '30px', border: 'none', cursor: 'pointer' }}
                />

                <input
                  type="color"
                  value={color0B}
                  onChange={e=>setColor0B(e.target.value)}
                  style={{ width: '50px', height: '30px', border: 'none', cursor: 'pointer' }}
                />

               </div>
              
      
        </div>


    </div>



    <div className="pb-4 bg-gray-100 flex flex-row">
      <div className="w-[50%] pt-6">
        
        <Cancha jugadoresIniciales={jugadoresLado1} moverJugador={moverJugador} lado={1} hexadecimal={color} hexadecimal1={colorB}/>
      </div>
      <div className="w-[50%] pt-6">
     
        <Cancha jugadoresIniciales={jugadoresLado0} moverJugador={moverJugador} lado={0} hexadecimal={color0} hexadecimal1={color0B}/>
      </div>
      
    </div>
    <div className="flex justify-center mt-4">

    <button className="p-2 bg-lime-400 rounded-2xl w-[20%]" onClick={enviarEquipos}>enviar</button>
    </div>
<div>
  
</div>
   {id?(<Modal id = {id} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} setid={setid} text={text}/>):""}
    </>);
}
export default Mainpage;
