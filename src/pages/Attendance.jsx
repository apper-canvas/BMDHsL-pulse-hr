import { useState } from 'react';
import AttendanceTable from '../components/Attendance/AttendanceTable';
import AttendanceForm from '../components/Attendance/AttendanceForm';
import AttendanceStats from '../components/Attendance/AttendanceStats';
import { useAttendance } from '../context/AttendanceContext';
import { UserPlus, Trash } from 'lucide-react';

const Attendance = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { clearAttendanceRecords } = useAttendance();

  const handleClearRecords = () => {
    if (window.confirm('Are you sure you want to clear all attendance records? This action cannot be undone.')) {
      clearAttendanceRecords();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Attendance</h1>
        
        <div className="flex gap-3">
          <button
            onClick={handleClearRecords}
            className="flex items-center gap-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            <Trash size={18} />
            <span>Clear Records</span>
          </button>
          
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <UserPlus size={18} />
            <span>Record Attendance</span>
          </button>
        </div>
      </div>

      <AttendanceStats />
      
      <AttendanceTable />
      
      {isAddModalOpen && (
        <AttendanceForm onClose={() => setIsAddModalOpen(false)} />
      )}
    </div>
  );
};

export default Attendance;