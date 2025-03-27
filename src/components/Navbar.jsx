import { useState } from 'react';
import { Bell, Search, User, Menu } from 'lucide-react';

const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showProfileMenu) setShowProfileMenu(false);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
    if (showNotifications) setShowNotifications(false);
  };

  return (
    <nav className="bg-white px-4 py-3 shadow-md flex justify-between items-center">
      <div className="flex items-center md:hidden">
        <button className="p-1">
          <Menu size={24} />
        </button>
      </div>

      <div className="hidden md:flex items-center flex-1">
        <div className="relative mx-4 flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <button
            onClick={toggleNotifications}
            className="p-1 rounded-full hover:bg-gray-100 relative"
          >
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-10 border">
              <h3 className="px-4 py-2 font-medium border-b">Notifications</h3>
              <div className="max-h-96 overflow-y-auto">
                <div className="px-4 py-3 hover:bg-gray-50 border-b">
                  <p className="text-sm font-medium">New leave request</p>
                  <p className="text-xs text-gray-500">John Doe requested leave</p>
                  <p className="text-xs text-gray-400">5 mins ago</p>
                </div>
                <div className="px-4 py-3 hover:bg-gray-50">
                  <p className="text-sm font-medium">Attendance alert</p>
                  <p className="text-xs text-gray-500">Jane Smith is late today</p>
                  <p className="text-xs text-gray-400">1 hour ago</p>
                </div>
              </div>
              <div className="px-4 py-2 text-center text-sm text-blue-600 border-t">
                View all notifications
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={toggleProfileMenu}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
              <User size={16} />
            </div>
            <span className="hidden md:inline font-medium">Admin</span>
          </button>
          
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10 border">
              <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Profile</a>
              <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Settings</a>
              <div className="border-t my-1"></div>
              <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Logout</a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;