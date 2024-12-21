
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 
          className="text-white text-2xl font-bold cursor-pointer hover:text-yellow-300"
          onClick={() => navigate('/inicio')}
        >
          Futbol-Manager
        </h1>
        <div className="flex space-x-4">
          <button
            className="text-white px-4 py-2 rounded-md hover:bg-white hover:text-blue-500 transition duration-300"
            onClick={() => navigate('/inicio')}
          >
            Inicio
          </button>
          <button
            className="text-white px-4 py-2 rounded-md hover:bg-white hover:text-purple-500 transition duration-300"
            onClick={() => navigate('/historial')}
          >
            Historial
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;