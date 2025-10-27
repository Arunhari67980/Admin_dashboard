import { useState } from 'react';

const projects = [
  { id: 1, name: "Alpha", status: "In Progress", owner: "Alice", priority: "High", deadline: "2025-11-10", budget: "$10,000", team: ["Alice", "David"] },
  { id: 2, name: "Beta", status: "Completed", owner: "Bob", priority: "Medium", deadline: "2025-10-15", budget: "$15,000", team: ["Bob", "Eve"] },
  { id: 3, name: "Gamma", status: "Pending", owner: "Charlie", priority: "Low", deadline: "2025-12-01", budget: "$5,000", team: ["Charlie", "Frank"] },
  { id: 4, name: "Delta", status: "In Progress", owner: "David", priority: "High", deadline: "2025-11-20", budget: "$20,000", team: ["David", "Grace"] },
  { id: 5, name: "Epsilon", status: "Completed", owner: "Eve", priority: "Medium", deadline: "2025-10-30", budget: "$12,000", team: ["Eve", "Hank"] },
];

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  // Filter projects based on search term
  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle project status (simulated interactivity)
  const toggleStatus = (project) => {
    const newStatus = project.status === "Completed" ? "In Progress" : 
                     project.status === "In Progress" ? "Pending" : "Completed";
    console.log(`Toggled ${project.name} status to ${newStatus}`); // Simulate API call
    // In a real app, update via API and state
  };

  return (
    <div className="space-y-6 p-6bg-gray-50 min-h-screen"> {/* Ensured bg-gray-50 for overall background */}
      <h2 className="text-2xl font-bold text-gray-900">Projects Overview</h2>

      {/* Search Bar with bg-gray-800 */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, owner, or status..."
          className="w-full p-2 border border-gray-700 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-800 text-white placeholder-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg font-bold text-white mb-2">{project.name}</h3>
            <p className="text-gray-400 mb-1">Owner: {project.owner}</p>
            <p className="text-gray-400 mb-1">Priority: {project.priority}</p>
            <p className="text-gray-400 mb-1">Deadline: {project.deadline}</p>
            <p className="text-gray-400 mb-1">Budget: {project.budget}</p>
            <p className="text-gray-400 mb-2">Team: {project.team.join(", ")}</p>
            <span
              className={`mt-2 inline-block px-3 py-1 text-xs font-medium rounded-full ${
                project.status === "Completed"
                  ? "bg-green-600/30 text-green-300"
                  : project.status === "In Progress"
                  ? "bg-yellow-600/30 text-yellow-300"
                  : "bg-red-600/30 text-red-300"
              }`}
            >
              {project.status}
            </span>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => toggleStatus(project)}
                className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Toggle Status
              </button>
              <button
                onClick={() => setSelectedProject(project)}
                className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed View Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold text-white mb-4">{selectedProject.name} Details</h3>
            <p className="text-gray-300 mb-2"><strong>Owner:</strong> {selectedProject.owner}</p>
            <p className="text-gray-300 mb-2"><strong>Priority:</strong> {selectedProject.priority}</p>
            <p className="text-gray-300 mb-2"><strong>Deadline:</strong> {selectedProject.deadline}</p>
            <p className="text-gray-300 mb-2"><strong>Budget:</strong> {selectedProject.budget}</p>
            <p className="text-gray-300 mb-2"><strong>Team:</strong> {selectedProject.team.join(", ")}</p>
            <p className="text-gray-300 mb-4"><strong>Status:</strong> {selectedProject.status}</p>
            <button
              onClick={() => setSelectedProject(null)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;