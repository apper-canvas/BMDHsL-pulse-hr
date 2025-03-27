import { useState } from 'react';
import LeaveList from '../components/Leave/LeaveList';
import LeaveForm from '../components/Leave/LeaveForm';
import { PlusCircle } from 'lucide-react';
import { useAttendance } from '../context/AttendanceContext';

const Leave = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { leaveRequests } = useAttendance();

  // Count leaves by status
  const pendingLeaves = leaveRequests.filter(leave => leave.status === 'pending').length;
  const approvedLeaves = leaveRequests.filter(leave => leave.status === 'approved').length;
  const rejectedLeaves = leaveRequests.filter(leave => leave.status === 'rejected').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Leave Management</h1>
        
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <PlusCircle size={18} />
          <span>Request Leave</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mb-3">
            <span className="text-lg font-bold">{pendingLeaves}</span>
          </div>
          <h3 className="font-medium">Pending</h3>
          <p className="text-sm text-gray-500">Leave requests</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-3">
            <span className="text-lg font-bold">{approvedLeaves}</span>
          </div>
          <h3 className="font-medium">Approved</h3>
          <p className="text-sm text-gray-500">Leave requests</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-3">
            <span className="text-lg font-bold">{rejectedLeaves}</span>
          </div>
          <h3 className="font-medium">Rejected</h3>
          <p className="text-sm text-gray-500">Leave requests</p>
        </div>
      </div>
      
      <LeaveList />
      
      {isAddModalOpen && (
        <LeaveForm onClose={() => setIsAddModalOpen(false)} />
      )}
    </div>
  );
};

export default Leave;