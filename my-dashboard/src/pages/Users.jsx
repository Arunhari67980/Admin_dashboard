import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Search, UserCheck, UserX, Settings } from 'lucide-react';

// Animation variants
const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.4, type: 'spring', stiffness: 120 },
  }),
  exit: { opacity: 0, x: 20, transition: { duration: 0.3 } },
};

const Users = () => {
  // Initial user data
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'User', status: 'Active' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Admin', status: 'Inactive' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'Active' },
  ]);

  // State for search and new user input
  const [searchTerm, setSearchTerm] = useState('');
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'User', status: 'Active' });

  // Filtered users
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add new user
  const addUser = () => {
    console.log('Add User clicked', newUser); // Debug log
    if (newUser.name.trim() && newUser.email.trim()) {
      const newUserId = Date.now(); // Unique ID
      setUsers((prev) => [
        ...prev,
        { id: newUserId, ...newUser },
      ]);
      setNewUser({ name: '', email: '', role: 'User', status: 'Active' }); // Reset form
    } else {
      console.log('Name or email is empty'); // Debug empty input
    }
  };

  // Toggle role
  const toggleRole = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, role: user.role === 'User' ? 'Admin' : 'User' } : user
      )
    );
  };

  // Toggle status
  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
          : user
      )
    );
  };

  return (
    <motion.div
      className="bg-gray-800 p-6 rounded-2xl shadow-lg"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>
      <p className="text-gray-400 mb-6">Manage your platform’s users, roles, and access levels here.</p>

      {/* Controls */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <label htmlFor="search" className="text-gray-400 mr-2">Search Users:</label>
          <div className="flex">
            <input
              id="search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-l-lg text-gray-200 focus:ring-2 focus:ring-blue-500"
              placeholder="Search by name or email..."
            />
            <span className="inline-flex items-center px-3 bg-gray-700 border border-l-0 border-gray-600 rounded-r-lg text-gray-400">
              <Search className="w-5 h-5" />
            </span>
          </div>
        </div>

        {/* Add User Input */}
        <div className="flex gap-2 items-end">
          <input
            type="text"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            placeholder="Name"
            className="p-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-blue-500 w-1/3"
          />
          <input
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            placeholder="Email"
            className="p-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-blue-500 w-1/3"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addUser}
            className="p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-500 flex items-center justify-center w-1/3 h-[42px]"
          >
            <UserPlus className="w-5 h-5" />
            <span className="ml-2">Add User</span>
          </motion.button>
        </div>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-gray-200">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filteredUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  custom={index}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{ backgroundColor: '#374151', transition: { duration: 0.2 } }}
                  className="border-t border-gray-600"
                >
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded ${user.role === 'Admin' ? 'bg-blue-900' : 'bg-gray-600'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded ${user.status === 'Active' ? 'bg-green-900' : 'bg-red-900'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-3 flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleRole(user.id)}
                      className="p-1 bg-gray-600 rounded text-gray-200 hover:bg-gray-500"
                    >
                      <Settings className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleStatus(user.id)}
                      className="p-1 bg-gray-600 rounded text-gray-200 hover:bg-gray-500"
                    >
                      {user.status === 'Active' ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Users;