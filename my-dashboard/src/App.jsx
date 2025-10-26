import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./components/Sidebar.jsx";
import Topbar from "./components/Topbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Analytics from "./pages/Analytics.jsx";
import Users from "./pages/Users.jsx";
import Projects from "./pages/Projects.jsx";
import Settings from "./pages/Settings.jsx";

const App = () => {
  return (
    <Router>
      <div className="flex bg-gray-900 min-h-screen text-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Topbar />
          <div className="p-6">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<PageWrapper><Dashboard /></PageWrapper>} />
                <Route path="/analytics" element={<PageWrapper><Analytics /></PageWrapper>} />
                <Route path="/users" element={<PageWrapper><Users /></PageWrapper>} />
                <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
                <Route path="/settings" element={<PageWrapper><Settings /></PageWrapper>} />
              </Routes>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Router>
  );
};

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

export default App;
