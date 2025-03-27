import { useAttendance } from '../../context/AttendanceContext';
import { format } from 'date-fns';

const RecentActivities = () => {
  const { attendanceRecords, leaveRequests, employees } = useAttendance();

  // Combine attendance records and leave requests
  const allActivities = [
    ...attendanceRecords.map(record => ({
      type: 'attendance',
      timestamp: record.timestamp,
      status: record.status,
      employeeId: record.employeeId,
      id: record.id
    })),
    ...leaveRequests.map(leave => ({
      type: 'leave',
      timestamp: leave.requestDate,
      status: leave.status,
      employeeId: leave.employeeId,
      startDate: leave.startDate,
      endDate: leave.endDate,
      id: leave.id
    }))
  ];

  // Sort by timestamp (most recent first)
  const sortedActivities = allActivities.sort((a, b) => {
    return new Date(b.timestamp) - new Date(a.timestamp);
  }).slice(0, 5); // Get only the 5 most recent

  const getEmployeeName = (id) => {
    const employee = employees.find(emp => emp.id === id);
    return employee ? `${employee.firstName} ${employee.lastName}` : 'Unknown Employee';
  };

  const getStatusBadge = (type, status) => {
    let colorClass = '';
    
    if (type === 'attendance') {
      colorClass = status === 'present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
    } else {
      if (status === 'approved') colorClass = 'bg-green-100 text-green-800';
      else if (status === 'pending') colorClass = 'bg-yellow-100 text-yellow-800';
      else colorClass = 'bg-red-100 text-red-800';
    }
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs ${colorClass}`}>
        {status}
      </span>
    );
  };

  const getActivityMessage = (activity) => {
    const employeeName = getEmployeeName(activity.employeeId);
    
    if (activity.type === 'attendance') {
      return `${employeeName} marked ${activity.status}`;
    } else {
      return `${employeeName} requested leave from ${activity.startDate} to ${activity.endDate}`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-3 border-b">
        <h3 className="text-lg font-medium">Recent Activities</h3>
      </div>
      <div className="overflow-hidden">
        {sortedActivities.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {sortedActivities.map((activity) => (
              <li key={`${activity.type}-${activity.id}`} className="px-4 py-3">
                <div className="flex justify-between">
                  <p className="text-sm">{getActivityMessage(activity)}</p>
                  {getStatusBadge(activity.type, activity.status)}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {format(new Date(activity.timestamp), 'MMM dd, yyyy • h:mm a')}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-4 py-3 text-center text-gray-500">No recent activities</p>
        )}
      </div>
    </div>
  );
};

export default RecentActivities;