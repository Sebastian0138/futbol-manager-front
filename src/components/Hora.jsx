

// eslint-disable-next-line react/prop-types
const Hora = ({hora}) => {

console.log(hora)

    return (
        <div className="flex flex-col justify-center">
          {hora ? (
            <div className=" w-">
              <h1 className="text-center">Hora del partido</h1>
              <h2 className="text-center">{hora}</h2>
            </div>
          ) : (
            <>Hora no definida</>
          )}
        </div>
      );
      
}

export default Hora
