import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle, XCircle, Calendar, AlertCircle, ChevronDown, ChevronUp, MapPin, Coffee } from 'lucide-react';

// Mock data for attendance records
const mockAttendanceRecords = [
  { date: '2023-12-01', checkIn: '09:05 AM', checkOut: '06:10 PM', status: 'Present', workHours: '9h 5m', location: 'Office' },
  { date: '2023-12-02', checkIn: '09:15 AM', checkOut: '06:00 PM', status: 'Present', workHours: '8h 45m', location: 'Office' },
  { date: '2023-12-03', checkIn: '09:00 AM', checkOut: '05:30 PM', status: 'Present', workHours: '8h 30m', location: 'Remote' },
  { date: '2023-12-04', checkIn: '09:30 AM', checkOut: '06:15 PM', status: 'Present', workHours: '8h 45m', location: 'Remote' },
  { date: '2023-12-05', checkIn: '09:10 AM', checkOut: '06:05 PM', status: 'Present', workHours: '8h 55m', location: 'Office' },
];

function MainFeature() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [attendanceStatus, setAttendanceStatus] = useState('Not Checked In');
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [workLocation, setWorkLocation] = useState('Office');
  const [showLocationOptions, setShowLocationOptions] = useState(false);
  const [attendanceRecords, setAttendanceRecords] = useState(mockAttendanceRecords);
  const [elapsedTime, setElapsedTime] = useState('0h 0m');
  
  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      if (checkInTime && !checkOutTime) {
        const elapsed = calculateElapsedTime(checkInTime, new Date());
        setElapsedTime(elapsed);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [checkInTime, checkOutTime]);
  
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatDate = (date) => {
    return date.toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' });
  };
  
  const calculateElapsedTime = (start, end) => {
    const diffMs = end - start;
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${diffHrs}h ${diffMins}m`;
  };
  
  const handleCheckIn = () => {
    const now = new Date();
    setCheckInTime(now);
    setAttendanceStatus('Checked In');
    setElapsedTime('0h 0m');
  };
  
  const handleCheckOut = () => {
    const now = new Date();
    setCheckOutTime(now);
    setAttendanceStatus('Checked Out');
    
    // Calculate work hours
    const workHours = calculateElapsedTime(checkInTime, now);
    
    // Add to attendance records
    const newRecord = {
      date: formatDate(now),
      checkIn: formatTime(checkInTime),
      checkOut: formatTime(now),
      status: 'Present',
      workHours: workHours,
      location: workLocation
    };
    
    setAttendanceRecords([newRecord, ...attendanceRecords]);
  };
  
  const handleReset = () => {
    setCheckInTime(null);
    setCheckOutTime(null);
    setAttendanceStatus('Not Checked In');
    setElapsedTime('0h 0m');
  };
  
  const selectLocation = (location) => {
    setWorkLocation(location);
    setShowLocationOptions(false);
  };

  return (
    <div className="card overflow-visible">
      <div className="p-6 border-b border-surface-200 dark:border-surface-700">
        <h2 className="text-xl font-semibold">Attendance Tracker</h2>
        <p className="text-surface-600 dark:text-surface-400 text-sm">
          Track your daily attendance and working hours
        </p>
      </div>
      
      <div className="p-6">
        {/* Current time and date display */}
        <div className="mb-8 text-center">
          <div className="text-4xl font-bold mb-2 text-gradient">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
          <div className="text-surface-600 dark:text-surface-400">
            {currentTime.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
        
        {/* Attendance status card */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-8 neu-card"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center mb-2">
                <Clock size={20} className="mr-2 text-primary" />
                <h3 className="font-semibold">Today's Status</h3>
              </div>
              
              <div className="flex items-center">
                {attendanceStatus === 'Checked In' && (
                  <CheckCircle size={18} className="mr-2 text-green-500" />
                )}
                {attendanceStatus === 'Checked Out' && (
                  <XCircle size={18} className="mr-2 text-accent" />
                )}
                {attendanceStatus === 'Not Checked In' && (
                  <AlertCircle size={18} className="mr-2 text-surface-500" />
                )}
                <span className="font-medium">{attendanceStatus}</span>
              </div>
              
              {checkInTime && (
                <div className="mt-2 text-sm text-surface-600 dark:text-surface-400">
                  Check-in: {formatTime(checkInTime)}
                  {checkOutTime && ` • Check-out: ${formatTime(checkOutTime)}`}
                  {!checkOutTime && ` • Elapsed: ${elapsedTime}`}
                </div>
              )}
            </div>
            
            <div className="flex flex-col space-y-3">
              {/* Location selector */}
              <div className="relative">
                <button
                  onClick={() => setShowLocationOptions(!showLocationOptions)}
                  className="btn-outline w-full flex items-center justify-between"
                  disabled={checkInTime !== null}
                >
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-2 text-primary" />
                    <span>{workLocation}</span>
                  </div>
                  {!checkInTime && (
                    showLocationOptions ? 
                    <ChevronUp size={16} /> : 
                    <ChevronDown size={16} />
                  )}
                </button>
                
                <AnimatePresence>
                  {showLocationOptions && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute z-10 mt-1 w-full bg-white dark:bg-surface-800 rounded-lg shadow-soft border border-surface-200 dark:border-surface-700 overflow-hidden"
                    >
                      <button
                        onClick={() => selectLocation('Office')}
                        className="w-full px-4 py-2 text-left hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors duration-150 flex items-center"
                      >
                        <MapPin size={16} className="mr-2 text-primary" />
                        Office
                      </button>
                      <button
                        onClick={() => selectLocation('Remote')}
                        className="w-full px-4 py-2 text-left hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors duration-150 flex items-center"
                      >
                        <Coffee size={16} className="mr-2 text-primary" />
                        Remote
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Action buttons */}
              {!checkInTime && !checkOutTime && (
                <button 
                  onClick={handleCheckIn}
                  className="btn-primary"
                >
                  Check In
                </button>
              )}
              
              {checkInTime && !checkOutTime && (
                <button 
                  onClick={handleCheckOut}
                  className="btn-secondary"
                >
                  Check Out
                </button>
              )}
              
              {checkInTime && checkOutTime && (
                <button 
                  onClick={handleReset}
                  className="btn-outline"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </motion.div>
        
        {/* Attendance records */}
        <div>
          <h3 className="font-semibold mb-4 flex items-center">
            <Calendar size={18} className="mr-2 text-primary" />
            Recent Attendance Records
          </h3>
          
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
                {attendanceRecords.map((record, index) => (
                  <motion.tr 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-surface-50 dark:hover:bg-surface-800"
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {record.date}
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
                      <span className="inline-flex items-center">
                        {record.location === 'Office' ? (
                          <MapPin size={14} className="mr-1 text-primary" />
                        ) : (
                          <Coffee size={14} className="mr-1 text-primary" />
                        )}
                        {record.location}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        {record.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainFeature;