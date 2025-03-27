import { useAttendance } from '../../context/AttendanceContext';
import { Users, UserCheck, UserX, Clock } from 'lucide-react';

const AttendanceStats = () => {
  const { employees, attendanceRecords } = useAttendance();
  
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Calculate statistics
  const totalEmployees = employees.length;
  
  const presentToday = attendanceRecords.filter(
    record => record.date === today && record.status === 'present'
  ).length;
  
  const absentToday = attendanceRecords.filter(
    record => record.date === today && record.status === 'absent'
  ).length;
  
  const lateToday = attendanceRecords.filter(
    record => record.date === today && record.status === 'late'
  ).length;
  
  const notRecordedToday = totalEmployees - (presentToday + absentToday + lateToday);
  
  // Generate data for the stats cards
  const stats = [
    {
      title: 'Total Employees',
      value: totalEmployees,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Present Today',
      value: presentToday,
      icon: UserCheck,
      color: 'bg-green-500',
    },
    {
      title: 'Absent Today',
      value: absentToday,
      icon: UserX,
      color: 'bg-red-500',
    },
    {
      title: 'Late Today',
      value: lateToday,
      icon: Clock,
      color: 'bg-yellow-500',
    },
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <div key={stat.title} className="bg-white rounded-lg shadow p-4 flex items-center">
          <div className={`${stat.color} p-3 rounded-lg`}>
            <stat.icon size={24} className="text-white" />
          </div>
          <div className="ml-4">
            <p className="text-gray-500 text-sm">{stat.title}</p>
            <p className="text-2xl font-semibold">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttendanceStats;