import { NavLink } from "react-router-dom";
import { Grid, BarChart3, Users, Folder, Settings } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 p-4 space-y-2">
      <NavLink to="/" className={({ isActive }) => `flex items-center p-2 rounded-lg hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`}>
        <Grid className="w-5 h-5 mr-3" /> Overview
      </NavLink>
      <NavLink to="/analytics" className={({ isActive }) => `flex items-center p-2 rounded-lg hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`}>
        <BarChart3 className="w-5 h-5 mr-3" /> Analytics
      </NavLink>
      <NavLink to="/users" className={({ isActive }) => `flex items-center p-2 rounded-lg hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`}>
        <Users className="w-5 h-5 mr-3" /> Users
      </NavLink>
      <NavLink to="/projects" className={({ isActive }) => `flex items-center p-2 rounded-lg hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`}>
        <Folder className="w-5 h-5 mr-3" /> Projects
      </NavLink>
      <NavLink to="/settings" className={({ isActive }) => `flex items-center p-2 rounded-lg hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`}>
        <Settings className="w-5 h-5 mr-3" /> Settings
      </NavLink>
    </div>
  );
};

export default Sidebar;
