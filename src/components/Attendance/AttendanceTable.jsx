import { useState } from 'react';
import { useAttendance } from '../../context/AttendanceContext';
import { ChevronLeft, ChevronRight, Search, Filter, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

const AttendanceTable = () => {
  const { attendanceRecords, employees, deleteAttendanceRecord } = useAttendance();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  
  const recordsPerPage = 10;

  const getEmployeeName = (id) => {
    const employee = employees.find(emp => emp.id === id);
    return employee ? `${employee.firstName} ${employee.lastName}` : 'Unknown Employee';
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this attendance record?')) {
      deleteAttendanceRecord(id);
    }
  };

  // Apply filters
  const filteredRecords = attendanceRecords.filter(record => {
    // Search filter
    const employeeName = getEmployeeName(record.employeeId).toLowerCase();
    const searchMatch = employeeName.includes(searchTerm.toLowerCase());
    
    // Date filter
    const dateMatch = filterDate ? record.date === filterDate : true;
    
    // Status filter
    const statusMatch = filterStatus ? record.status === filterStatus : true;
    
    return searchMatch && dateMatch && statusMatch;
  });

  // Sort by date (most recent first) and then by employee name
  const sortedRecords = [...filteredRecords].sort((a, b) => {
    if (a.date === b.date) {
      return getEmployeeName(a.employeeId).localeCompare(getEmployeeName(b.employeeId));
    }
    return new Date(b.date) - new Date(a.date);
  });

  // Pagination
  const totalPages = Math.ceil(sortedRecords.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = sortedRecords.slice(indexOfFirstRecord, indexOfLastRecord);

  const resetFilters = () => {
    setSearchTerm('');
    setFilterDate('');
    setFilterStatus('');
    setCurrentPage(1);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold mb-4">Attendance Records</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          
          <div>
            <input
              type="date"
              className="px-4 py-2 border rounded-lg w-full"
              value={filterDate}
              onChange={(e) => {
                setFilterDate(e.target.value);
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
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="late">Late</option>
              <option value="half-day">Half Day</option>
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
        {attendanceRecords.length > 0 ? (
          <>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check In
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check Out
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.date ? format(new Date(record.date), 'MMM dd, yyyy') : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">
                          {getEmployeeName(record.employeeId)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        record.status === 'present' ? 'bg-green-100 text-green-800' :
                        record.status === 'absent' ? 'bg-red-100 text-red-800' :
                        record.status === 'late' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.checkIn || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.checkOut || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleDelete(record.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-3 flex items-center justify-between border-t">
                <div className="text-sm text-gray-500">
                  Showing {indexOfFirstRecord + 1}-{Math.min(indexOfLastRecord, sortedRecords.length)} of {sortedRecords.length}
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
            No attendance records found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceTable;