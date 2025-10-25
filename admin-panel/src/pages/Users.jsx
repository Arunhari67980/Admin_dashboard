import DataTable from '../components/DataTable';

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin' },
  // Add more mock data as needed...
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com', role: 'User' },
];

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
];

const Users = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users Management</h1>
      <DataTable data={mockUsers} columns={columns} title="Users List" />
    </div>
  );
};

export default Users;