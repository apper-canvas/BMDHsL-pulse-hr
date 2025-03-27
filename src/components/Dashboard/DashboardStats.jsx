import { Users, Clock, Calendar, AlertCircle } from 'lucide-react';
import { useAttendance } from '../../context/AttendanceContext';

const DashboardStats = () => {
  const { employees, attendanceRecords, leaveRequests } = useAttendance();

  const today = new Date().toISOString().split('T')[0];
  const presentToday = attendanceRecords.filter(
    record => record.date === today && record.status === 'present'
  ).length;

  const pendingLeaves = leaveRequests.filter(
    leave => leave.status === 'pending'
  ).length;

  const stats = [
    {
      title: 'Total Employees',
      value: employees.length,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Present Today',
      value: presentToday,
      icon: Clock,
      color: 'bg-green-500',
    },
    {
      title: 'Absent Today',
      value: employees.length - presentToday,
      icon: AlertCircle,
      color: 'bg-red-500',
    },
    {
      title: 'Pending Leaves',
      value: pendingLeaves,
      icon: Calendar,
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

export default DashboardStats;