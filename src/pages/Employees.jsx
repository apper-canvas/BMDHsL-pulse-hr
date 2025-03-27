import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, UserPlus, Filter, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import EmployeeCard from '../components/EmployeeCard';
import employeesData from '../data/employeesData';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const employeesPerPage = 8;
  
  useEffect(() => {
    // Simulating API call with timeout
    const timer = setTimeout(() => {
      setEmployees(employeesData);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Get filtered employees
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = departmentFilter === 'All' || employee.department === departmentFilter;
    const matchesStatus = statusFilter === 'All' || employee.status === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });
  
  // Get current employees
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Get unique departments for filter
  const departments = ['All', ...new Set(employees.map(employee => employee.department))];
  const statuses = ['All', ...new Set(employees.map(employee => employee.status))];
  
  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 10
    },
    in: {
      opacity: 1,
      y: 0
    },
    out: {
      opacity: 0,
      y: -10
    }
  };
  
  const pageTransition = {
    type: 'tween',
    ease: 'easeInOut',
    duration: 0.3
  };
  
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="container mx-auto px-4 py-8"
    >
      {/* Header with title and actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-50">Employees</h1>
          <p className="text-surface-600 dark:text-surface-400 mt-1">Manage your team members and their access</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="btn-primary flex items-center">
            <UserPlus size={18} className="mr-2" />
            Add Employee
          </button>
        </div>
      </div>
      
      {/* Search and Filters */}
      <div className="mb-8 bg-white dark:bg-surface-800 rounded-xl shadow-sm border border-surface-200 dark:border-surface-700 p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Search */}
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-surface-400" />
            </div>
            <input
              type="text"
              className="input pl-10"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
            />
          </div>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="relative">
              <label className="text-xs text-surface-500 dark:text-surface-400 mb-1 block">Department</label>
              <div className="relative">
                <select
                  className="input appearance-none pr-10"
                  value={departmentFilter}
                  onChange={(e) => {
                    setDepartmentFilter(e.target.value);
                    setCurrentPage(1); // Reset to first page on filter change
                  }}
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDown size={16} className="text-surface-400" />
                </div>
              </div>
            </div>
            
            <div className="relative">
              <label className="text-xs text-surface-500 dark:text-surface-400 mb-1 block">Status</label>
              <div className="relative">
                <select
                  className="input appearance-none pr-10"
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1); // Reset to first page on filter change
                  }}
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDown size={16} className="text-surface-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Employee cards grid */}
      {employees.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 bg-surface-200 dark:bg-surface-700 rounded-full mb-4"></div>
            <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded w-48 mb-2.5"></div>
            <div className="h-3 bg-surface-200 dark:bg-surface-700 rounded w-32"></div>
          </div>
        </div>
      ) : filteredEmployees.length === 0 ? (
        <div className="bg-white dark:bg-surface-800 rounded-xl shadow-sm border border-surface-200 dark:border-surface-700 p-8 text-center">
          <div className="flex flex-col items-center">
            <div className="bg-surface-100 dark:bg-surface-700 rounded-full p-4 mb-4">
              <Search size={32} className="text-surface-500 dark:text-surface-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No employees found</h3>
            <p className="text-surface-600 dark:text-surface-400 max-w-md">
              We couldn't find any employees matching your search criteria. Try adjusting your filters or search term.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentEmployees.map(employee => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))}
          </div>
          
          {/* Pagination */}
          {filteredEmployees.length > employeesPerPage && (
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center space-x-2">
                <button
                  onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-md border border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 disabled:opacity-50 disabled:pointer-events-none"
                >
                  <ChevronLeft size={18} />
                </button>
                
                {[...Array(Math.ceil(filteredEmployees.length / employeesPerPage)).keys()].map(number => (
                  <button
                    key={number + 1}
                    onClick={() => paginate(number + 1)}
                    className={`px-3.5 py-2 rounded-md border ${
                      currentPage === number + 1
                        ? 'border-primary bg-primary-50 dark:bg-primary-900/20 text-primary'
                        : 'border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800'
                    }`}
                  >
                    {number + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => paginate(currentPage < Math.ceil(filteredEmployees.length / employeesPerPage) ? currentPage + 1 : currentPage)}
                  disabled={currentPage === Math.ceil(filteredEmployees.length / employeesPerPage)}
                  className="p-2 rounded-md border border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 disabled:opacity-50 disabled:pointer-events-none"
                >
                  <ChevronRight size={18} />
                </button>
              </nav>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default Employees;