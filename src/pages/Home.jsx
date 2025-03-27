import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, FileText, CheckCircle, AlertCircle, Users, DollarSign, Award } from 'lucide-react';
import MainFeature from '../components/MainFeature';

// Mock data for the dashboard
const mockEmployeeData = {
  name: "Alex Johnson",
  position: "Senior Developer",
  department: "Engineering",
  attendance: {
    status: "Present",
    checkInTime: "09:15 AM",
    workingHours: "7h 45m"
  },
  leaveBalance: {
    casual: 8,
    sick: 5,
    earned: 12
  },
  upcomingHolidays: [
    { date: "2023-12-25", name: "Christmas" },
    { date: "2024-01-01", name: "New Year's Day" },
    { date: "2024-01-15", name: "Martin Luther King Jr. Day" }
  ],
  pendingTasks: [
    { id: 1, title: "Complete performance review", dueDate: "2023-12-10" },
    { id: 2, title: "Submit expense reports", dueDate: "2023-12-15" }
  ],
  announcements: [
    { id: 1, title: "Year-end party", content: "Join us for the annual year-end celebration on December 22nd at 6 PM." },
    { id: 2, title: "New health benefits", content: "Updated health insurance plans will be effective from January 1st. Check your email for details." }
  ]
};

function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('dashboard');
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };
  
  const formatDate = (date) => {
    return date.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Welcome back, {mockEmployeeData.name}!
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center text-surface-600 dark:text-surface-400">
          <div className="flex items-center mr-6 mb-2 sm:mb-0">
            <Clock size={18} className="mr-2 text-primary" />
            <span>{formatTime(currentTime)}</span>
          </div>
          <div className="flex items-center">
            <Calendar size={18} className="mr-2 text-primary" />
            <span>{formatDate(currentTime)}</span>
          </div>
        </div>
      </motion.div>
      
      {/* Tab navigation */}
      <div className="mb-8 border-b border-surface-200 dark:border-surface-700">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === 'dashboard'
                ? 'border-primary text-primary'
                : 'border-transparent text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-300'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === 'attendance'
                ? 'border-primary text-primary'
                : 'border-transparent text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-300'
            }`}
          >
            Attendance
          </button>
        </nav>
      </div>
      
      {activeTab === 'dashboard' ? (
        <>
          {/* Quick stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="neu-card flex items-center"
            >
              <div className="rounded-full bg-primary/10 p-3 mr-4">
                <CheckCircle size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-surface-500 dark:text-surface-400">Status</h3>
                <p className="text-lg font-semibold">{mockEmployeeData.attendance.status}</p>
                <p className="text-xs text-surface-500 dark:text-surface-400">
                  Check-in: {mockEmployeeData.attendance.checkInTime}
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="neu-card flex items-center"
            >
              <div className="rounded-full bg-secondary/10 p-3 mr-4">
                <Calendar size={24} className="text-secondary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-surface-500 dark:text-surface-400">Leave Balance</h3>
                <p className="text-lg font-semibold">{mockEmployeeData.leaveBalance.casual + mockEmployeeData.leaveBalance.sick} days</p>
                <p className="text-xs text-surface-500 dark:text-surface-400">
                  Casual: {mockEmployeeData.leaveBalance.casual}, Sick: {mockEmployeeData.leaveBalance.sick}
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="neu-card flex items-center"
            >
              <div className="rounded-full bg-accent/10 p-3 mr-4">
                <FileText size={24} className="text-accent" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-surface-500 dark:text-surface-400">Pending Tasks</h3>
                <p className="text-lg font-semibold">{mockEmployeeData.pendingTasks.length}</p>
                <p className="text-xs text-surface-500 dark:text-surface-400">
                  Next due: {mockEmployeeData.pendingTasks[0].dueDate}
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="neu-card flex items-center"
            >
              <div className="rounded-full bg-primary/10 p-3 mr-4">
                <AlertCircle size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-surface-500 dark:text-surface-400">Next Holiday</h3>
                <p className="text-lg font-semibold">{mockEmployeeData.upcomingHolidays[0].name}</p>
                <p className="text-xs text-surface-500 dark:text-surface-400">
                  {mockEmployeeData.upcomingHolidays[0].date}
                </p>
              </div>
            </motion.div>
          </div>
          
          {/* Main feature section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-8"
          >
            <MainFeature />
          </motion.div>
          
          {/* Announcements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-xl font-semibold mb-4">Company Announcements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockEmployeeData.announcements.map(announcement => (
                <div 
                  key={announcement.id} 
                  className="card p-6 hover:shadow-soft transition-shadow duration-300"
                >
                  <h3 className="text-lg font-semibold mb-2">{announcement.title}</h3>
                  <p className="text-surface-600 dark:text-surface-300">{announcement.content}</p>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Quick access */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <a href="/employees" className="card p-6 flex flex-col items-center justify-center text-center hover:shadow-soft transition-shadow duration-300">
                <Users size={24} className="text-primary mb-2" />
                <span className="text-sm font-medium">Employees</span>
              </a>
              <a href="/attendance" className="card p-6 flex flex-col items-center justify-center text-center hover:shadow-soft transition-shadow duration-300">
                <Clock size={24} className="text-secondary mb-2" />
                <span className="text-sm font-medium">Attendance</span>
              </a>
              <a href="/payroll" className="card p-6 flex flex-col items-center justify-center text-center hover:shadow-soft transition-shadow duration-300">
                <DollarSign size={24} className="text-accent mb-2" />
                <span className="text-sm font-medium">Payroll</span>
              </a>
              <a href="/performance" className="card p-6 flex flex-col items-center justify-center text-center hover:shadow-soft transition-shadow duration-300">
                <Award size={24} className="text-primary mb-2" />
                <span className="text-sm font-medium">Performance</span>
              </a>
            </div>
          </motion.div>
        </>
      ) : (
        <MainFeature />
      )}
    </div>
  );
}

export default Home;