import { useState } from 'react';
import { useAttendance } from '../../context/AttendanceContext';
import { X } from 'lucide-react';
import { differenceInDays, addDays } from 'date-fns';

const LeaveForm = ({ onClose }) => {
  const { employees, requestLeave } = useAttendance();
  const [formData, setFormData] = useState({
    employeeId: '',
    leaveType: 'annual',
    startDate: '',
    endDate: '',
    reason: '',
    contactInfo: ''
  });
  const [errors, setErrors] = useState({});

  const calculateDays = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      return differenceInDays(addDays(end, 1), start);
    }
    return 0;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.employeeId) newErrors.employeeId = 'Employee is required';
    if (!formData.leaveType) newErrors.leaveType = 'Leave type is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    if (formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
      newErrors.endDate = 'End date cannot be before start date';
    }
    if (!formData.reason) newErrors.reason = 'Reason is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    requestLeave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center border-b px-6 py-3">
          <h3 className="text-lg font-medium">Request Leave</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Employee
              </label>
              <select
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg ${errors.employeeId ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Select Employee</option>
                {employees.map(employee => (
                  <option key={employee.id} value={employee.id}>
                    {employee.firstName} {employee.lastName}
                  </option>
                ))}
              </select>
              {errors.employeeId && (
                <p className="mt-1 text-sm text-red-600">{errors.employeeId}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Leave Type
              </label>
              <select
                name="leaveType"
                value={formData.leaveType}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg ${errors.leaveType ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="annual">Annual Leave</option>
                <option value="sick">Sick Leave</option>
                <option value="personal">Personal Leave</option>
                <option value="unpaid">Unpaid Leave</option>
                <option value="other">Other</option>
              </select>
              {errors.leaveType && (
                <p className="mt-1 text-sm text-red-600">{errors.leaveType}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg ${errors.startDate ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.startDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg ${errors.endDate ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.endDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>
                )}
              </div>
            </div>
            
            {formData.startDate && formData.endDate && (
              <div className="bg-blue-50 p-3 rounded-lg text-sm">
                <p className="font-medium text-blue-800">
                  Duration: {calculateDays()} day{calculateDays() !== 1 ? 's' : ''}
                </p>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason
              </label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                rows="3"
                className={`w-full px-3 py-2 border rounded-lg ${errors.reason ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Please explain the reason for your leave request..."
              ></textarea>
              {errors.reason && (
                <p className="mt-1 text-sm text-red-600">{errors.reason}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Information (Optional)
              </label>
              <input
                type="text"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Phone number or email where you can be reached during leave..."
              />
            </div>
          </div>
          
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveForm;