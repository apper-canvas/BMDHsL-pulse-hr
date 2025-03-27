import { Phone, Mail, Edit, MoreVertical } from 'lucide-react';

const EmployeeCard = ({ employee }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'On Leave':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      case 'Terminated':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="card">
      <div className="flex flex-col h-full">
        {/* Header with more options */}
        <div className="flex justify-end p-3">
          <button className="p-1 rounded-full text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">
            <MoreVertical size={16} />
          </button>
        </div>
        
        {/* Avatar and basic info */}
        <div className="flex flex-col items-center px-6 pb-4 -mt-4">
          <div className="relative">
            <img 
              src={employee.avatar} 
              alt={employee.name} 
              className="w-20 h-20 rounded-full object-cover border-4 border-white dark:border-surface-800 shadow-sm"
            />
            <span className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white dark:border-surface-800 ${employee.status === 'Active' ? 'bg-green-500' : employee.status === 'On Leave' ? 'bg-amber-500' : 'bg-gray-500'}`}></span>
          </div>
          <h3 className="mt-3 text-lg font-semibold text-surface-800 dark:text-surface-100">{employee.name}</h3>
          <p className="text-sm text-surface-600 dark:text-surface-400">{employee.position}</p>
          <div className="mt-1 px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-full truncate" style={{maxWidth: '140px'}}>
            {employee.department}
          </div>
          <div className="mt-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
              {employee.status}
            </span>
          </div>
        </div>
        
        {/* Contact details */}
        <div className="px-6 py-4 border-t border-surface-200 dark:border-surface-700 mt-auto">
          <div className="flex items-center text-sm text-surface-600 dark:text-surface-400 mb-2">
            <Mail size={14} className="mr-2 flex-shrink-0" />
            <span className="truncate">{employee.email}</span>
          </div>
          <div className="flex items-center text-sm text-surface-600 dark:text-surface-400">
            <Phone size={14} className="mr-2 flex-shrink-0" />
            <span>{employee.phone}</span>
          </div>
        </div>
        
        {/* Footer with hire date and actions */}
        <div className="px-6 py-3 bg-surface-50 dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700 rounded-b-xl">
          <div className="flex items-center justify-between">
            <div className="text-xs text-surface-500 dark:text-surface-400">
              Hired: {formatDate(employee.hireDate)}
            </div>
            <button className="p-1 rounded text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">
              <Edit size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;