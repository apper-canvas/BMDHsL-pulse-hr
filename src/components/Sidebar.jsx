import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Clock, 
  Calendar, 
  Settings,
  BarChart,
  FileText,
  HelpCircle
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: Home, path: '/' },
    { name: 'Employees', icon: Users, path: '/employees' },
    { name: 'Attendance', icon: Clock, path: '/attendance' },
    { name: 'Leave', icon: Calendar, path: '/leave' },
    { name: 'Reports', icon: BarChart, path: '/reports' },
    { name: 'Documents', icon: FileText, path: '/documents' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-gray-800 text-white">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">Attendance MS</h1>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name} className="px-2 py-1">
              <NavLink 
                to={item.path} 
                className={({ isActive }) => 
                  `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-700'
                  }`
                }
              >
                <item.icon size={18} />
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-3 text-gray-300 hover:text-white cursor-pointer">
          <HelpCircle size={18} />
          <span>Help & Support</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;