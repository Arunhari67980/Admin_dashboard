import { Sun, Moon, Bell } from "lucide-react";
import { useState } from "react";

const Topbar = () => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="flex items-center justify-between bg-gray-800 p-4 shadow-md">
      <div>
        <h1 className="text-xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-400">Welcome back — here's what's new</p>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-700 transition">
          <Bell className="w-5 h-5" />
        </button>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-gray-700 transition"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-sm font-semibold">
          AD
        </div>
      </div>
    </div>
  );
};

export default Topbar;
