import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, Clock, ChevronLeft, ChevronRight, Users, BarChart2, 
  Calendar as CalendarIcon, UserCheck, Clipboard, Download, Filter, Search
} from 'lucide-react';
import AttendanceCalendar from '../components/AttendanceCalendar';
import AttendanceStats from '../components/AttendanceStats';

const Attendance = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState('employee'); // can be 'employee', 'manager', 'admin'
  const [filterView, setFilterView] = useState('daily'); // 'daily', 'weekly', 'monthly'
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for attendance
  const mockAttendanceData = [
    { date: '2023-12-01', checkIn: '09:05 AM', checkOut: '06:10 PM', status: 'Present', workHours: '9h 5m', location: 'Office' },
    { date: '2023-12-02', checkIn: '09:15 AM', checkOut: '06:00 PM', status: 'Present', workHours: '8h 45m', location: 'Office' },
    { date: '2023-12-03', checkIn: '09:00 AM', checkOut: '05:30 PM', status: 'Present', workHours: '8h 30m', location: 'Remote' },
    { date: '2023-12-04', checkIn: '09:30 AM', checkOut: '06:15 PM', status: 'Present', workHours: '8h 45m', location: 'Remote' },
    { date: '2023-12-05', checkIn: '09:10 AM', checkOut: '06:05 PM', status: 'Present', workHours: '8h 55m', location: 'Office' },
    { date: '2023-12-06', checkIn: '10:00 AM', checkOut: '06:30 PM', status: 'Late', workHours: '8h 30m', location: 'Office' },
    { date: '2023-12-07', checkIn: '09:20 AM', checkOut: '06:45 PM', status: 'Present', workHours: '9h 25m', location: 'Office' },
    { date: '2023-12-08', checkIn: '09:00 AM', checkOut: '05:45 PM', status: 'Present', workHours: '8h 45m', location: 'Remote' },
    { date: '2023-12-11', checkIn: '09:05 AM', checkOut: '06:00 PM', status: 'Present', workHours: '8h 55m', location: 'Office' },
    { date: '2023-12-12', checkIn: '09:45 AM', checkOut: '06:30 PM', status: 'Late', workHours: '8h 45m', location: 'Office' },
    { date: '2023-12-13', checkIn: '09:00 AM', checkOut: '06:15 PM', status: 'Present', workHours: '9h 15m', location: 'Office' },
    { date: '2023-12-14', checkIn: 'N/A', checkOut: 'N/A', status: 'Absent', workHours: '0h 0m', location: 'N/A' },
    { date: '2023-12-15', checkIn: '09:10 AM', checkOut: '06:00 PM', status: 'Present', workHours: '8h 50m', location: 'Remote' },
    { date: '2023-12-18', checkIn: '09:00 AM', checkOut: '05:30 PM', status: 'Present', workHours: '8h 30m', location: 'Office' },
    { date: '2023-12-19', checkIn: '09:15 AM', checkOut: '06:10 PM', status: 'Present', workHours: '8h 55m', location: 'Office' },
    { date: '2023-12-20', checkIn: '09:30 AM', checkOut: '06:30 PM', status: 'Present', workHours: '9h 0m', location: 'Office' },
    { date: '2023-12-21', checkIn: '09:00 AM', checkOut: '06:00 PM', status: 'Present', workHours: '9h 0m', location: 'Remote' },
    { date: '2023-12-22', checkIn: '09:10 AM', checkOut: '05:45 PM', status: 'Present', workHours: '8h 35m', location: 'Office' },
  ];
  
  // Mock team attendance data (only visible to managers/admins)
  const mockTeamAttendanceData = [
    { id: 1, name: 'Sarah Johnson', department: 'Marketing', checkIn: '09:00 AM', checkOut: '06:00 PM', status: 'Present' },
    { id: 2, name: 'Michael Chen', department: 'Engineering', checkIn: '08:45 AM', checkOut: '05:30 PM', status: 'Present' },
    { id: 3, name: 'Jessica Smith', department: 'Design', checkIn: '09:15 AM', checkOut: '06:15 PM', status: 'Present' },
    { id: 4, name: 'David Williams', department: 'Product', checkIn: '10:00 AM', checkOut: '06:30 PM', status: 'Late' },
    { id: 5, name: 'Amanda Rodriguez', department: 'HR', checkIn: '09:05 AM', checkOut: '06:00 PM', status: 'Present' },
    { id: 6, name: 'Robert Johnson', department: 'Engineering', checkIn: 'N/A', checkOut: 'N/A', status: 'Absent' },
    { id: 7, name: 'Emily Davis', department: 'Marketing', checkIn: '09:30 AM', checkOut: '06:00 PM', status: 'Late' },
    { id: 8, name: 'James Wilson', department: 'Finance', checkIn: '08:50 AM', checkOut: '05:45 PM', status: 'Present' },
  ];
  
  // Mock attendance statistics
  const mockAttendanceStats = {
    present: 18,
    absent: 1,
    late: 2,
    total: 21,
    workingHours: {
      total: 183,
      average: 8.7,
      overtime: 5.5
    },
    punctuality: 90, // percentage
    monthlyTrend: [90, 88, 92, 95, 91, 90]
  };
  
  useEffect(() => {
    // Simulate loading attendance data
    setIsLoading(true);
    
    setTimeout(() => {
      setAttendanceData(mockAttendanceData);
      setIsLoading(false);
    }, 800);
  }, []);
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Function to navigate months
  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };
  
  // Get status badge styling
  const getStatusBadge = (status) => {
    switch(status) {
      case 'Present':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Absent':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'Late':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Half Day':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-surface-100 text-surface-800 dark:bg-surface-700 dark:text-surface-200';
    }
  };
  
  // Calculate month name and year
  const monthName = currentMonth.toLocaleString('default', { month: 'long' });
  const currentYear = currentMonth.getFullYear();
  
  // Page transition variants
  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -10 }
  };
  
  const pageTransition = {
    type: 'tween',
    ease: 'easeInOut',
    duration: 0.3
  };
  
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="container mx-auto px-4 py-8"
    >
      {/* Header with title and actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-50">Attendance</h1>
          <p className="text-surface-600 dark:text-surface-400 mt-1">
            Track, manage, and analyze attendance records
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button className="btn-outline flex items-center">
            <Filter size={16} className="mr-2" />
            Filter
          </button>
          <button className="btn-outline flex items-center">
            <Download size={16} className="mr-2" />
            Export
          </button>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="mb-6 bg-white dark:bg-surface-800 rounded-xl overflow-hidden shadow-sm border border-surface-200 dark:border-surface-700">
        <div className="flex flex-wrap">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'overview'
                ? 'text-primary border-b-2 border-primary bg-primary-50 dark:bg-primary-900/10'
                : 'text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary'
            }`}
          >
            <div className="flex items-center">
              <Clock size={18} className="mr-2" />
              Overview
            </div>
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'calendar'
                ? 'text-primary border-b-2 border-primary bg-primary-50 dark:bg-primary-900/10'
                : 'text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary'
            }`}
          >
            <div className="flex items-center">
              <CalendarIcon size={18} className="mr-2" />
              Calendar
            </div>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'history'
                ? 'text-primary border-b-2 border-primary bg-primary-50 dark:bg-primary-900/10'
                : 'text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary'
            }`}
          >
            <div className="flex items-center">
              <Clipboard size={18} className="mr-2" />
              History
            </div>
          </button>
          <button
            onClick={() => setActiveTab('statistics')}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'statistics'
                ? 'text-primary border-b-2 border-primary bg-primary-50 dark:bg-primary-900/10'
                : 'text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary'
            }`}
          >
            <div className="flex items-center">
              <BarChart2 size={18} className="mr-2" />
              Statistics
            </div>
          </button>
          {(userRole === 'manager' || userRole === 'admin') && (
            <button
              onClick={() => setActiveTab('team')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'team'
                  ? 'text-primary border-b-2 border-primary bg-primary-50 dark:bg-primary-900/10'
                  : 'text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary'
              }`}
            >
              <div className="flex items-center">
                <Users size={18} className="mr-2" />
                Team
              </div>
            </button>
          )}
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="bg-white dark:bg-surface-800 rounded-xl shadow-sm border border-surface-200 dark:border-surface-700 p-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Today's attendance */}
              <div className="flex-1 neu-card">
                <h3 className="text-lg font-semibold mb-4">Today's Attendance</h3>
                
                <div className="mb-6 text-center">
                  <div className="text-3xl font-bold mb-1 text-gradient">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className="text-surface-600 dark:text-surface-400 text-sm">
                    {new Date().toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                  <div>
                    <div className="text-sm text-surface-500 dark:text-surface-400 mb-1">Check In</div>
                    <div className="font-semibold">09:05 AM</div>
                  </div>
                  <div className="hidden sm:block text-surface-400">•</div>
                  <div>
                    <div className="text-sm text-surface-500 dark:text-surface-400 mb-1">Check Out</div>
                    <div className="font-semibold">-- : --</div>
                  </div>
                  <div className="hidden sm:block text-surface-400">•</div>
                  <div>
                    <div className="text-sm text-surface-500 dark:text-surface-400 mb-1">Working Hours</div>
                    <div className="font-semibold">2h 30m</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-6">
                  <div className="flex items-center">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Present
                    </span>
                  </div>
                  <button className="btn-primary">
                    Check Out
                  </button>
                </div>
              </div>
              
              {/* Monthly summary */}
              <div className="flex-1 neu-card">
                <h3 className="text-lg font-semibold mb-4">Monthly Summary</h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white dark:bg-surface-700 p-4 rounded-lg shadow-sm">
                    <div className="text-sm text-surface-500 dark:text-surface-400 mb-1">Present</div>
                    <div className="text-xl font-bold text-green-600 dark:text-green-400">{mockAttendanceStats.present}</div>
                  </div>
                  <div className="bg-white dark:bg-surface-700 p-4 rounded-lg shadow-sm">
                    <div className="text-sm text-surface-500 dark:text-surface-400 mb-1">Absent</div>
                    <div className="text-xl font-bold text-red-600 dark:text-red-400">{mockAttendanceStats.absent}</div>
                  </div>
                  <div className="bg-white dark:bg-surface-700 p-4 rounded-lg shadow-sm">
                    <div className="text-sm text-surface-500 dark:text-surface-400 mb-1">Late</div>
                    <div className="text-xl font-bold text-yellow-600 dark:text-yellow-400">{mockAttendanceStats.late}</div>
                  </div>
                  <div className="bg-white dark:bg-surface-700 p-4 rounded-lg shadow-sm">
                    <div className="text-sm text-surface-500 dark:text-surface-400 mb-1">Punctuality</div>
                    <div className="text-xl font-bold text-primary">{mockAttendanceStats.punctuality}%</div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-surface-700 p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-sm font-medium">Working Hours Overview</div>
                    <div className="text-xs text-surface-500 dark:text-surface-400">This Month</div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm text-surface-600 dark:text-surface-400">Total Hours</div>
                    <div className="font-medium">{mockAttendanceStats.workingHours.total} hours</div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm text-surface-600 dark:text-surface-400">Average Daily</div>
                    <div className="font-medium">{mockAttendanceStats.workingHours.average} hours</div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-surface-600 dark:text-surface-400">Overtime</div>
                    <div className="font-medium">{mockAttendanceStats.workingHours.overtime} hours</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recent attendance records */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Recent Attendance Records</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-surface-200 dark:divide-surface-700">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                        Check In
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                        Check Out
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                        Work Hours
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-200 dark:divide-surface-700">
                    {isLoading ? (
                      Array(5).fill(0).map((_, index) => (
                        <tr key={index} className="animate-pulse">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded w-24"></div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded w-16"></div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded w-16"></div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded w-12"></div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded w-14"></div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded w-20"></div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      attendanceData.slice(0, 5).map((record, index) => (
                        <tr key={index} className="hover:bg-surface-50 dark:hover:bg-surface-800">
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            {formatDate(record.date)}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            {record.checkIn}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            {record.checkOut}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                            {record.workHours}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            {record.location}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(record.status)}`}>
                              {record.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {/* Calendar Tab */}
        {activeTab === 'calendar' && (
          <div>
            {/* Month Navigation */}
            <div className="flex justify-between items-center mb-6">
              <button 
                onClick={() => navigateMonth('prev')}
                className="p-2 rounded-md border border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800"
              >
                <ChevronLeft size={16} />
              </button>
              
              <h3 className="text-lg font-semibold">{monthName} {currentYear}</h3>
              
              <button 
                onClick={() => navigateMonth('next')}
                className="p-2 rounded-md border border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800"
              >
                <ChevronRight size={16} />
              </button>
            </div>
            
            {/* Calendar Component */}
            <AttendanceCalendar 
              month={currentMonth} 
              attendanceData={attendanceData} 
            />
            
            {/* Legend */}
            <div className="mt-6 flex flex-wrap gap-4 justify-center">
              <div className="flex items-center">
                <span className="w-4 h-4 inline-block rounded-full bg-green-500 mr-2"></span>
                <span className="text-sm text-surface-600 dark:text-surface-400">Present</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 inline-block rounded-full bg-red-500 mr-2"></span>
                <span className="text-sm text-surface-600 dark:text-surface-400">Absent</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 inline-block rounded-full bg-yellow-500 mr-2"></span>
                <span className="text-sm text-surface-600 dark:text-surface-400">Late</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 inline-block rounded-full bg-blue-500 mr-2"></span>
                <span className="text-sm text-surface-600 dark:text-surface-400">Half Day</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 inline-block rounded-full bg-surface-300 dark:bg-surface-600 mr-2"></span>
                <span className="text-sm text-surface-600 dark:text-surface-400">Weekend/Holiday</span>
              </div>
            </div>
          </div>
        )}
        
        {/* History Tab */}
        {activeTab === 'history' && (
          <div>
            {/* Filter controls */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
              <div className="relative flex-grow max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-surface-400" />
                </div>
                <input
                  type="text"
                  className="input pl-10"
                  placeholder="Search by date, status..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex space-x-3">
                <button 
                  className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                    filterView === 'daily' 
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary border border-primary'
                      : 'border border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400'
                  }`}
                  onClick={() => setFilterView('daily')}
                >
                  Daily
                </button>
                <button 
                  className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                    filterView === 'weekly' 
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary border border-primary'
                      : 'border border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400'
                  }`}
                  onClick={() => setFilterView('weekly')}
                >
                  Weekly
                </button>
                <button 
                  className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                    filterView === 'monthly' 
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary border border-primary'
                      : 'border border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400'
                  }`}
                  onClick={() => setFilterView('monthly')}
                >
                  Monthly
                </button>
              </div>
            </div>
            
            {/* Attendance records table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-surface-200 dark:divide-surface-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                      Check In
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                      Check Out
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                      Work Hours
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-200 dark:divide-surface-700">
                  {isLoading ? (
                    Array(8).fill(0).map((_, index) => (
                      <tr key={index} className="animate-pulse">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded w-24"></div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded w-16"></div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded w-16"></div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded w-12"></div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded w-14"></div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded w-20"></div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    attendanceData.map((record, index) => (
                      <tr key={index} className="hover:bg-surface-50 dark:hover:bg-surface-800">
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          {formatDate(record.date)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          {record.checkIn}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          {record.checkOut}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                          {record.workHours}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          {record.location}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(record.status)}`}>
                            {record.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Statistics Tab */}
        {activeTab === 'statistics' && (
          <div>
            <AttendanceStats stats={mockAttendanceStats} />
          </div>
        )}
        
        {/* Team Tab (Only for managers and admins) */}
        {activeTab === 'team' && (userRole === 'manager' || userRole === 'admin') && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Team Attendance Overview</h3>
            
            {/* Search and filter */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
              <div className="relative flex-grow max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-surface-400" />
                </div>
                <input
                  type="text"
                  className="input pl-10"
                  placeholder="Search team members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="text-surface-500 dark:text-surface-400 text-sm">
                Today: {new Date().toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>
            
            {/* Team attendance table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-surface-200 dark:divide-surface-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                      Check In
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                      Check Out
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-200 dark:divide-surface-700">
                  {mockTeamAttendanceData.map((employee) => (
                    <tr key={employee.id} className="hover:bg-surface-50 dark:hover:bg-surface-800">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary">
                            {employee.name.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium">{employee.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        {employee.department}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        {employee.checkIn}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        {employee.checkOut}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(employee.status)}`}>
                          {employee.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm">
                        <button className="text-primary hover:text-primary-dark transition-colors duration-200">
                          <UserCheck size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Summary cards */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-surface-700 p-4 rounded-lg shadow-sm">
                <h4 className="text-sm font-medium mb-3">Present Today</h4>
                <div className="flex items-end justify-between">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">6</div>
                  <div className="text-sm text-surface-500 dark:text-surface-400">75% of team</div>
                </div>
              </div>
              <div className="bg-white dark:bg-surface-700 p-4 rounded-lg shadow-sm">
                <h4 className="text-sm font-medium mb-3">Absent Today</h4>
                <div className="flex items-end justify-between">
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">1</div>
                  <div className="text-sm text-surface-500 dark:text-surface-400">12.5% of team</div>
                </div>
              </div>
              <div className="bg-white dark:bg-surface-700 p-4 rounded-lg shadow-sm">
                <h4 className="text-sm font-medium mb-3">Late Today</h4>
                <div className="flex items-end justify-between">
                  <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">1</div>
                  <div className="text-sm text-surface-500 dark:text-surface-400">12.5% of team</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Attendance;