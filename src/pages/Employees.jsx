import { useState } from 'react';
import EmployeeList from '../components/Employees/EmployeeList';
import EmployeeForm from '../components/Employees/EmployeeForm';
import { UserPlus } from 'lucide-react';

const Employees = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Employees</h1>
        
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <UserPlus size={18} />
          <span>Add Employee</span>
        </button>
      </div>

      <EmployeeList />
      
      {isAddModalOpen && (
        <EmployeeForm onClose={() => setIsAddModalOpen(false)} />
      )}
    </div>
  );
};

export default Employees;