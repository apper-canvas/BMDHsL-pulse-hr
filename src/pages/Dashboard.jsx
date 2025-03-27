import { useState, useEffect } from 'react';
import { useAttendance } from '../context/AttendanceContext';
import DashboardStats from '../components/Dashboard/DashboardStats';
import RecentActivities from '../components/Dashboard/RecentActivities';
import { format } from 'date-fns';

const Dashboard = () => {
  const { employees, attendanceRecords, leaveRequests } = useAttendance();
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    setCurrentDate(format(new Date(), 'EEEE, MMMM d, yyyy'));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-md text-gray-600">{currentDate}</p>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivities />
        </div>
        
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-3 border-b">
            <h3 className="text-lg font-medium">Upcoming Leaves</h3>
          </div>
          <div className="p-4">
            {leaveRequests.filter(leave => 
              leave.status === 'approved' && 
              new Date(leave.startDate) >= new Date()
            ).slice(0, 5).length > 0 ? (
              <div className="space-y-4">
                {leaveRequests
                  .filter(leave => 
                    leave.status === 'approved' && 
                    new Date(leave.startDate) >= new Date()
                  )
                  .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
                  .slice(0, 5)
                  .map(leave => {
                    const employee = employees.find(emp => emp.id === leave.employeeId);
                    const employeeName = employee 
                      ? `${employee.firstName} ${employee.lastName}` 
                      : 'Unknown Employee';
                    
                    return (
                      <div key={leave.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{employeeName}</p>
                          <p className="text-sm text-gray-500">{leave.leaveType} Leave</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {format(new Date(leave.startDate), 'MMM dd')} - {format(new Date(leave.endDate), 'MMM dd')}
                          </p>
                          <p className="text-xs text-gray-500">
                            {format(new Date(leave.startDate), 'yyyy')}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-4">No upcoming leaves</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-3 border-b">
            <h3 className="text-lg font-medium">Employee Distribution</h3>
          </div>
          <div className="p-4">
            {employees.length > 0 ? (
              <div className="space-y-4">
                {Object.entries(
                  employees.reduce((acc, employee) => {
                    acc[employee.department] = (acc[employee.department] || 0) + 1;
                    return acc;
                  }, {})
                ).map(([department, count]) => (
                  <div key={department} className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div 
                        className="bg-blue-600 h-4 rounded-full" 
                        style={{ width: `${(count / employees.length) * 100}%` }}
                      ></div>
                    </div>
                    <div className="min-w-[100px] ml-3 flex justify-between">
                      <span className="text-sm">{department}</span>
                      <span className="text-sm font-medium">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-4">No employee data available</p>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-3 border-b">
            <h3 className="text-lg font-medium">Attendance Summary</h3>
          </div>
          <div className="p-4">
            {attendanceRecords.length > 0 ? (
              <div className="space-y-4">
                {Object.entries(
                  attendanceRecords.reduce((acc, record) => {
                    acc[record.status] = (acc[record.status] || 0) + 1;
                    return acc;
                  }, {})
                ).map(([status, count]) => {
                  const colors = {
                    present: 'bg-green-600',
                    absent: 'bg-red-600',
                    late: 'bg-yellow-600',
                    'half-day': 'bg-blue-600'
                  };
                  
                  return (
                    <div key={status} className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div 
                          className={`${colors[status] || 'bg-gray-600'} h-4 rounded-full`}
                          style={{ width: `${(count / attendanceRecords.length) * 100}%` }}
                        ></div>
                      </div>
                      <div className="min-w-[100px] ml-3 flex justify-between">
                        <span className="text-sm capitalize">{status}</span>
                        <span className="text-sm font-medium">{count}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-4">No attendance data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;