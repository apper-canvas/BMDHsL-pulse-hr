import { useState } from 'react';
import { useAttendance } from '../../context/AttendanceContext';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight, Search, Filter, Check, X } from 'lucide-react';

const LeaveList = () => {
  const { leaveRequests, employees, updateLeaveStatus, deleteLeaveRequest } = useAttendance();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('');
  
  const recordsPerPage = 10;

  const getEmployeeName = (id) => {
    const employee = employees.find(emp => emp.id === id);
    return employee ? `${employee.firstName} ${employee.lastName}` : 'Unknown Employee';
  };

  const handleApprove = (id) => {
    updateLeaveStatus(id, 'approved');
  };

  const handleReject = (id) => {
    updateLeaveStatus(id, 'rejected');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this leave request?')) {
      deleteLeaveRequest(id);
    }
  };

  // Apply filters
  const filteredLeaves = leaveRequests.filter(leave => {
    // Search filter
    const employeeName = getEmployeeName(leave.employeeId).toLowerCase();
    const searchMatch = employeeName.includes(searchTerm.toLowerCase());
    
    // Status filter
    const statusMatch = filterStatus ? leave.status === filterStatus : true;
    
    return searchMatch && statusMatch;
  });

  // Sort by request date (most recent first)
  const sortedLeaves = [...filteredLeaves].sort((a, b) => {
    return new Date(b.requestDate) - new Date(a.requestDate);
  });

  // Pagination
  const totalPages = Math.ceil(sortedLeaves.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentLeaves = sortedLeaves.slice(indexOfFirstRecord, indexOfLastRecord);

  const resetFilters = () => {
    setSearchTerm('');
    setFilterStatus('');
    setCurrentPage(1);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold mb-4">Leave Requests</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by employee..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          
          <div className="flex gap-2">
            <select
              className="px-4 py-2 border rounded-lg flex-1"
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center"
            >
              <Filter size={18} />
              <span className="ml-2">Reset</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        {leaveRequests.length > 0 ? (
          <>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Leave Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Request Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentLeaves.map((leave) => (
                  <tr key={leave.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">
                          {getEmployeeName(leave.employeeId)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {leave.leaveType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(leave.startDate), 'MMM dd')} - {format(new Date(leave.endDate), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        leave.status === 'approved' ? 'bg-green-100 text-green-800' : 
                        leave.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {leave.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(leave.requestDate), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        {leave.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(leave.id)}
                              className="text-green-600 hover:text-green-900"
                              title="Approve"
                            >
                              <Check size={18} />
                            </button>
                            <button
                              onClick={() => handleReject(leave.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Reject"
                            >
                              <X size={18} />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleDelete(leave.id)}
                          className="text-gray-600 hover:text-gray-900"
                          title="Delete"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-3 flex items-center justify-between border-t">
                <div className="text-sm text-gray-500">
                  Showing {indexOfFirstRecord + 1}-{Math.min(indexOfLastRecord, sortedLeaves.length)} of {sortedLeaves.length}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-md border disabled:opacity-50"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-md border disabled:opacity-50"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="py-8 text-center text-gray-500">
            No leave requests found.
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveList;