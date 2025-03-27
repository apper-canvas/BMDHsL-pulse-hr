import { createContext, useState, useEffect, useContext } from 'react';

const AttendanceContext = createContext();

export function useAttendance() {
  return useContext(AttendanceContext);
}

export function AttendanceProvider({ children }) {
  const [employees, setEmployees] = useState(() => {
    const savedEmployees = localStorage.getItem('employees');
    return savedEmployees ? JSON.parse(savedEmployees) : [];
  });

  const [attendanceRecords, setAttendanceRecords] = useState(() => {
    const savedRecords = localStorage.getItem('attendanceRecords');
    return savedRecords ? JSON.parse(savedRecords) : [];
  });

  const [leaveRequests, setLeaveRequests] = useState(() => {
    const savedLeaves = localStorage.getItem('leaveRequests');
    return savedLeaves ? JSON.parse(savedLeaves) : [];
  });

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('attendanceRecords', JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);

  useEffect(() => {
    localStorage.setItem('leaveRequests', JSON.stringify(leaveRequests));
  }, [leaveRequests]);

  // Employee CRUD operations
  const addEmployee = (employee) => {
    const newEmployee = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...employee
    };
    setEmployees(prev => [...prev, newEmployee]);
    return newEmployee;
  };

  const updateEmployee = (id, updatedInfo) => {
    setEmployees(prev => 
      prev.map(employee => 
        employee.id === id ? { ...employee, ...updatedInfo } : employee
      )
    );
  };

  const deleteEmployee = (id) => {
    setEmployees(prev => prev.filter(employee => employee.id !== id));
    setAttendanceRecords(prev => prev.filter(record => record.employeeId !== id));
    setLeaveRequests(prev => prev.filter(leave => leave.employeeId !== id));
  };

  const getEmployee = (id) => {
    return employees.find(employee => employee.id === id);
  };

  // Attendance operations
  const clearAttendanceRecords = () => {
    setAttendanceRecords([]);
  };

  const addAttendanceRecord = (record) => {
    const newRecord = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...record
    };
    setAttendanceRecords(prev => [...prev, newRecord]);
    return newRecord;
  };

  const updateAttendanceRecord = (id, updatedInfo) => {
    setAttendanceRecords(prev => 
      prev.map(record => 
        record.id === id ? { ...record, ...updatedInfo } : record
      )
    );
  };

  const deleteAttendanceRecord = (id) => {
    setAttendanceRecords(prev => prev.filter(record => record.id !== id));
  };

  // Leave operations
  const requestLeave = (leave) => {
    const newLeave = {
      id: Date.now().toString(),
      status: 'pending',
      requestDate: new Date().toISOString(),
      ...leave
    };
    setLeaveRequests(prev => [...prev, newLeave]);
    return newLeave;
  };

  const updateLeaveStatus = (id, status) => {
    setLeaveRequests(prev => 
      prev.map(leave => 
        leave.id === id ? { ...leave, status, updatedAt: new Date().toISOString() } : leave
      )
    );
  };

  const deleteLeaveRequest = (id) => {
    setLeaveRequests(prev => prev.filter(leave => leave.id !== id));
  };

  const value = {
    employees,
    attendanceRecords,
    leaveRequests,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee,
    clearAttendanceRecords,
    addAttendanceRecord,
    updateAttendanceRecord,
    deleteAttendanceRecord,
    requestLeave,
    updateLeaveStatus,
    deleteLeaveRequest
  };

  return (
    <AttendanceContext.Provider value={value}>
      {children}
    </AttendanceContext.Provider>
  );
}