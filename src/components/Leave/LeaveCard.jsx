import { format } from 'date-fns';

const LeaveCard = ({ leave, employee }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  return (
    <div className={`border rounded-lg overflow-hidden ${
      leave.status === 'approved' ? 'border-green-200' : 
      leave.status === 'rejected' ? 'border-red-200' : 
      'border-yellow-200'
    }`}>
      <div className={`px-4 py-2 ${getStatusColor(leave.status)}`}>
        <div className="flex justify-between items-center">
          <span className="font-medium capitalize">{leave.leaveType} Leave</span>
          <span className="text-xs capitalize px-2 py-1 rounded-full bg-white">
            {leave.status}
          </span>
        </div>
      </div>
      
      <div className="p-4 bg-white">
        <div className="flex items-center mb-3">
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
            {employee?.firstName?.[0]}{employee?.lastName?.[0]}
          </div>
          <div className="ml-3">
            <p className="font-medium">{employee?.firstName} {employee?.lastName}</p>
            <p className="text-xs text-gray-500">{employee?.department}</p>
          </div>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Duration:</span>
            <span>{format(new Date(leave.startDate), 'MMM dd')} - {format(new Date(leave.endDate), 'MMM dd, yyyy')}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-500">Requested on:</span>
            <span>{format(new Date(leave.requestDate), 'MMM dd, yyyy')}</span>
          </div>
          
          <div>
            <p className="text-gray-500">Reason:</p>
            <p className="mt-1">{leave.reason}</p>
          </div>
          
          {leave.contactInfo && (
            <div>
              <p className="text-gray-500">Contact:</p>
              <p>{leave.contactInfo}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveCard;