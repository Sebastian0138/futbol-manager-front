

// eslint-disable-next-line react/prop-types
const Modal = ({ id,setid, setIsModalOpen,IsModalOpen,text }) => {

    
    const cerrar = ()=>{
        setIsModalOpen(false) 
        console.log(IsModalOpen)
        setid("")

    }
    return (
        <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg w-96 p-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">{text}</h2>
          <p className="text-center text-gray-600 mb-6">ID: <span className="font-mono text-gray-900">{id}</span></p>
          <button
            onClick={()=>cerrar()}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Cerrar
          </button>
        </div>
      </div>
      </>
    );
  };

export default Modal
