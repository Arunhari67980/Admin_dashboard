import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="text-lg font-semibold">Welcome, {user?.username}</div>
      <div className="flex items-center">
        <FaUserCircle className="text-2xl mr-2" />
        <button onClick={handleLogout} className="text-indigo-600 hover:text-indigo-800">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;