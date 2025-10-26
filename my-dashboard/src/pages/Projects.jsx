const projects = [
  { name: "Alpha", status: "In Progress", owner: "Alice" },
  { name: "Beta", status: "Completed", owner: "Bob" },
  { name: "Gamma", status: "Pending", owner: "Charlie" },
];

const Projects = () => (
  <div className="space-y-4">
    <h2 className="text-2xl font-semibold">Projects Overview</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {projects.map((p, i) => (
        <div key={i} className="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-bold mb-2">{p.name}</h3>
          <p className="text-gray-400">Owner: {p.owner}</p>
          <span
            className={`mt-2 inline-block px-3 py-1 text-xs rounded-full ${
              p.status === "Completed"
                ? "bg-green-600/30 text-green-300"
                : p.status === "In Progress"
                ? "bg-yellow-600/30 text-yellow-300"
                : "bg-red-600/30 text-red-300"
            }`}
          >
            {p.status}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default Projects;
