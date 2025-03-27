import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, CheckCircle, XCircle, Clock, Info } from 'lucide-react';

const AttendanceCalendar = ({ month, attendanceData }) => {
  const [selectedDay, setSelectedDay] = useState(null);

  // Get first day of the month
  const firstDayOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
  
  // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfWeek = firstDayOfMonth.getDay();
  
  // Get the number of days in the month
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  
  // Get the days of the previous month to display
  const daysFromPrevMonth = firstDayOfWeek;
  
  // Get the total number of cells needed (previous month days + current month days)
  const totalCells = Math.ceil((daysFromPrevMonth + daysInMonth) / 7) * 7;
  
  // Create an array of day numbers for the calendar
  const calendarDays = [];
  
  // Add days from the previous month
  const prevMonthDays = new Date(month.getFullYear(), month.getMonth(), 0).getDate();
  for (let i = 0; i < daysFromPrevMonth; i++) {
    calendarDays.push({
      day: prevMonthDays - daysFromPrevMonth + i + 1,
      currentMonth: false,
      date: new Date(month.getFullYear(), month.getMonth() - 1, prevMonthDays - daysFromPrevMonth + i + 1)
    });
  }
  
  // Add days from the current month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      day: i,
      currentMonth: true,
      date: new Date(month.getFullYear(), month.getMonth(), i)
    });
  }
  
  // Add days from the next month
  const remainingCells = totalCells - calendarDays.length;
  for (let i = 1; i <= remainingCells; i++) {
    calendarDays.push({
      day: i,
      currentMonth: false,
      date: new Date(month.getFullYear(), month.getMonth() + 1, i)
    });
  }
  
  // Format date to YYYY-MM-DD for comparison with attendance data
  const formatDateForComparison = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  // Get attendance status for a specific day
  const getAttendanceForDay = (date) => {
    const formattedDate = formatDateForComparison(date);
    return attendanceData.find(record => record.date === formattedDate);
  };
  
  // Get color class based on attendance status
  const getStatusColor = (date) => {
    // Weekend check
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return "bg-surface-200 dark:bg-surface-700 text-surface-500 dark:text-surface-400";
    }
    
    const attendance = getAttendanceForDay(date);
    if (!attendance) return ""; // No attendance data
    
    switch (attendance.status) {
      case 'Present':
        return "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 border-green-300 dark:border-green-800";
      case 'Absent':
        return "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 border-red-300 dark:border-red-800";
      case 'Late':
        return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 border-yellow-300 dark:border-yellow-800";
      case 'Half Day':
        return "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-800";
      default:
        return "";
    }
  };
  
  // Check if a date is today
  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };
  
  // Handle day selection
  const handleDayClick = (dayInfo) => {
    if (dayInfo.currentMonth) {
      setSelectedDay(dayInfo);
    }
  };
  
  // Close day details
  const closeDayDetails = () => {
    setSelectedDay(null);
  };
  
  return (
    <div className="bg-white dark:bg-surface-700 rounded-lg shadow-sm p-4">
      <div className="grid grid-cols-7 gap-1">
        {/* Day of week headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div 
            key={day} 
            className="text-center py-2 text-xs font-medium text-surface-500 dark:text-surface-400"
          >
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {calendarDays.map((dayInfo, index) => {
          const statusColor = dayInfo.currentMonth ? getStatusColor(dayInfo.date) : "";
          const attendance = dayInfo.currentMonth ? getAttendanceForDay(dayInfo.date) : null;
          const todayClass = isToday(dayInfo.date) ? "ring-2 ring-primary" : "";
          
          return (
            <button
              key={index}
              onClick={() => handleDayClick(dayInfo)}
              disabled={!dayInfo.currentMonth}
              className={`
                aspect-square flex flex-col items-center justify-center rounded-lg text-sm
                ${dayInfo.currentMonth 
                  ? `${statusColor} cursor-pointer hover:opacity-90 transition-opacity ${todayClass}` 
                  : 'text-surface-400 dark:text-surface-600 opacity-40 cursor-default'
                }
              `}
            >
              <div className="font-medium">{dayInfo.day}</div>
              {attendance && (
                <div className="text-xs mt-1">
                  {attendance.status === 'Present' && <CheckCircle size={12} className="inline" />}
                  {attendance.status === 'Absent' && <XCircle size={12} className="inline" />}
                  {attendance.status === 'Late' && <Clock size={12} className="inline" />}
                </div>
              )}
            </button>
          );
        })}
      </div>
      
      {/* Selected day details */}
      {selectedDay && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="mt-6 p-4 border border-surface-200 dark:border-surface-600 rounded-lg"
        >
          <div className="flex justify-between items-center">
            <h4 className="font-medium flex items-center">
              <CalendarIcon size={16} className="mr-2 text-primary" />
              {selectedDay.date.toLocaleDateString(undefined, { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h4>
            <button 
              onClick={closeDayDetails}
              className="text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200"
            >
              ×
            </button>
          </div>
          
          {getAttendanceForDay(selectedDay.date) ? (
            <div className="mt-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-surface-500 dark:text-surface-400">Check In</div>
                  <div className="font-medium">{getAttendanceForDay(selectedDay.date).checkIn}</div>
                </div>
                <div>
                  <div className="text-xs text-surface-500 dark:text-surface-400">Check Out</div>
                  <div className="font-medium">{getAttendanceForDay(selectedDay.date).checkOut}</div>
                </div>
                <div>
                  <div className="text-xs text-surface-500 dark:text-surface-400">Work Hours</div>
                  <div className="font-medium">{getAttendanceForDay(selectedDay.date).workHours}</div>
                </div>
                <div>
                  <div className="text-xs text-surface-500 dark:text-surface-400">Location</div>
                  <div className="font-medium">{getAttendanceForDay(selectedDay.date).location}</div>
                </div>
              </div>
              
              <div className="mt-3">
                <div className="text-xs text-surface-500 dark:text-surface-400">Status</div>
                <span className={`mt-1 inline-block px-2 py-1 text-xs font-medium rounded-full 
                  ${getAttendanceForDay(selectedDay.date).status === 'Present' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : getAttendanceForDay(selectedDay.date).status === 'Absent'
                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}
                >
                  {getAttendanceForDay(selectedDay.date).status}
                </span>
              </div>
            </div>
          ) : (
            <div className="mt-3 flex items-center text-surface-500 dark:text-surface-400">
              <Info size={16} className="mr-2" />
              No attendance data for this day.
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default AttendanceCalendar;