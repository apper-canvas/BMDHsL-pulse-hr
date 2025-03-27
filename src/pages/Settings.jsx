import { useState } from 'react';
import { useAttendance } from '../context/AttendanceContext';
import { Save, RefreshCw, AlertTriangle } from 'lucide-react';

const Settings = () => {
  const { clearAttendanceRecords } = useAttendance();
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    attendanceReminders: true,
    leaveUpdates: true,
    systemAlerts: false
  });
  
  const [generalSettings, setGeneralSettings] = useState({
    companyName: 'Your Company',
    workHours: {
      start: '09:00',
      end: '17:00'
    },
    timezone: 'UTC',
    weekStartsOn: 'Monday'
  });
  
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const handleGeneralChange = (e) => {
    const { name, value } = e.target;
    setGeneralSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleWorkHoursChange = (e) => {
    const { name, value } = e.target;
    setGeneralSettings(prev => ({
      ...prev,
      workHours: {
        ...prev.workHours,
        [name]: value
      }
    }));
  };
  
  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all attendance records? This action cannot be undone.')) {
      clearAttendanceRecords();
      alert('All attendance records have been cleared.');
    }
  };
  
  const handleResetLocalStorage = () => {
    if (window.confirm('Are you sure you want to reset all app data? This will remove all employees, attendance records, and leave requests.')) {
      localStorage.clear();
      alert('All data has been reset. The page will now reload.');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-medium">General Settings</h2>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                value={generalSettings.companyName}
                onChange={handleGeneralChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Work Hours Start
                </label>
                <input
                  type="time"
                  name="start"
                  value={generalSettings.workHours.start}
                  onChange={handleWorkHoursChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Work Hours End
                </label>
                <input
                  type="time"
                  name="end"
                  value={generalSettings.workHours.end}
                  onChange={handleWorkHoursChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Timezone
              </label>
              <select
                name="timezone"
                value={generalSettings.timezone}
                onChange={handleGeneralChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="UTC">UTC</option>
                <option value="EST">Eastern Time (EST)</option>
                <option value="CST">Central Time (CST)</option>
                <option value="MST">Mountain Time (MST)</option>
                <option value="PST">Pacific Time (PST)</option>
                <option value="IST">India Standard Time (IST)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Week Starts On
              </label>
              <select
                name="weekStartsOn"
                value={generalSettings.weekStartsOn}
                onChange={handleGeneralChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="Monday">Monday</option>
                <option value="Sunday">Sunday</option>
                <option value="Saturday">Saturday</option>
              </select>
            </div>
            
            <div className="pt-2">
              <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                <Save size={18} />
                <span>Save Settings</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-medium">Notification Settings</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Email Notifications</label>
                <p className="text-sm text-gray-500">Receive email updates</p>
              </div>
              <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={notificationSettings.emailNotifications}
                  onChange={handleNotificationChange}
                  className="opacity-0 w-0 h-0"
                  id="emailNotifications"
                />
                <label
                  htmlFor="emailNotifications"
                  className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full ${
                    notificationSettings.emailNotifications ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span 
                    className={`absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${
                      notificationSettings.emailNotifications ? 'transform translate-x-6' : ''
                    }`} 
                  />
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Attendance Reminders</label>
                <p className="text-sm text-gray-500">Daily attendance check reminders</p>
              </div>
              <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                <input
                  type="checkbox"
                  name="attendanceReminders"
                  checked={notificationSettings.attendanceReminders}
                  onChange={handleNotificationChange}
                  className="opacity-0 w-0 h-0"
                  id="attendanceReminders"
                />
                <label
                  htmlFor="attendanceReminders"
                  className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full ${
                    notificationSettings.attendanceReminders ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span 
                    className={`absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${
                      notificationSettings.attendanceReminders ? 'transform translate-x-6' : ''
                    }`} 
                  />
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Leave Updates</label>
                <p className="text-sm text-gray-500">Updates on leave requests</p>
              </div>
              <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                <input
                  type="checkbox"
                  name="leaveUpdates"
                  checked={notificationSettings.leaveUpdates}
                  onChange={handleNotificationChange}
                  className="opacity-0 w-0 h-0"
                  id="leaveUpdates"
                />
                <label
                  htmlFor="leaveUpdates"
                  className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full ${
                    notificationSettings.leaveUpdates ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span 
                    className={`absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${
                      notificationSettings.leaveUpdates ? 'transform translate-x-6' : ''
                    }`} 
                  />
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">System Alerts</label>
                <p className="text-sm text-gray-500">Important system notifications</p>
              </div>
              <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                <input
                  type="checkbox"
                  name="systemAlerts"
                  checked={notificationSettings.systemAlerts}
                  onChange={handleNotificationChange}
                  className="opacity-0 w-0 h-0"
                  id="systemAlerts"
                />
                <label
                  htmlFor="systemAlerts"
                  className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full ${
                    notificationSettings.systemAlerts ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span 
                    className={`absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${
                      notificationSettings.systemAlerts ? 'transform translate-x-6' : ''
                    }`} 
                  />
                </label>
              </div>
            </div>
            
            <div className="pt-2">
              <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                <Save size={18} />
                <span>Save Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Data Management */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-medium">Data Management</h2>
        </div>
        <div className="p-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <div className="text-yellow-600 mr-3 mt-0.5">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h3 className="font-medium text-yellow-800">Warning</h3>
                <p className="text-sm text-yellow-700">
                  The following actions will delete data from the system. These actions cannot be undone.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-1">Clear Attendance Records</h3>
              <p className="text-sm text-gray-500 mb-3">
                This will delete all attendance records while keeping employee data intact.
              </p>
              <button 
                onClick={handleClearData}
                className="flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-lg hover:bg-red-200"
              >
                <RefreshCw size={18} />
                <span>Clear All Attendance Records</span>
              </button>
            </div>
            
            <div className="pt-4 border-t">
              <h3 className="font-medium mb-1">Reset All Data</h3>
              <p className="text-sm text-gray-500 mb-3">
                This will reset all data in the system including employees, attendance records, and leave requests.
              </p>
              <button 
                onClick={handleResetLocalStorage}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                <AlertTriangle size={18} />
                <span>Reset All Data</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;