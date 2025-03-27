import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AttendanceProvider } from './context/AttendanceContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Attendance from './pages/Attendance';
import Leave from './pages/Leave';
import Settings from './pages/Settings';

function App() {
  return (
    <AttendanceProvider>
      <Router>
        <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <Navbar />
            <main className="flex-1 overflow-y-auto p-4">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/leave" element={<Leave />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </AttendanceProvider>
  );
}

export default App;