import DataTable from '../components/DataTable';

const mockProducts = [
  { id: 1, name: 'Product A', price: 29.99, stock: 100 },
  { id: 2, name: 'Product B', price: 49.99, stock: 50 },
  // Add more...
  { id: 3, name: 'Product C', price: 19.99, stock: 200 },
];

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'price', label: 'Price' },
  { key: 'stock', label: 'Stock' },
];

const Products = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products Management</h1>
      <DataTable data={mockProducts} columns={columns} title="Products List" />
    </div>
  );
};

export default Products;