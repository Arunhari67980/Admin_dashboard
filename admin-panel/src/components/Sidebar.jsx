import { useNavigate } from 'react-router-dom';
import { FaHome, FaUsers, FaBox, FaCog } from 'react-icons/fa';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-white shadow-md flex flex-col">
      <div className="p-4 text-xl font-bold text-indigo-600">Admin Panel</div>
      <nav className="mt-4 flex-1">
        <ul>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => navigate('/dashboard')}>
            <FaHome className="inline mr-2" /> Dashboard
          </li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => navigate('/users')}>
            <FaUsers className="inline mr-2" /> Users
          </li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => navigate('/products')}>
            <FaBox className="inline mr-2" /> Products
          </li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <FaCog className="inline mr-2" /> Settings
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;