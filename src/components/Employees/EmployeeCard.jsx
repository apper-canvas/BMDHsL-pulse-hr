import { Phone, Mail, MapPin, Calendar } from 'lucide-react';
import { format } from 'date-fns';

const EmployeeCard = ({ employee }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 bg-blue-600 text-white text-center">
        <div className="h-24 w-24 rounded-full bg-white text-blue-600 mx-auto flex items-center justify-center text-2xl font-bold">
          {employee.firstName[0]}{employee.lastName[0]}
        </div>
        <h3 className="mt-4 text-xl font-semibold">
          {employee.firstName} {employee.lastName}
        </h3>
        <p className="text-blue-100">{employee.position}</p>
      </div>
      
      <div className="p-6">
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <div className="mt-0.5 text-gray-500">
              <Mail size={18} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{employee.email}</p>
            </div>
          </li>
          
          <li className="flex items-start gap-3">
            <div className="mt-0.5 text-gray-500">
              <Phone size={18} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{employee.phone || 'Not provided'}</p>
            </div>
          </li>
          
          <li className="flex items-start gap-3">
            <div className="mt-0.5 text-gray-500">
              <Calendar size={18} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Join Date</p>
              <p className="font-medium">
                {employee.joinDate 
                  ? format(new Date(employee.joinDate), 'MMM dd, yyyy')
                  : 'Not provided'}
              </p>
            </div>
          </li>
          
          {employee.address && (
            <li className="flex items-start gap-3">
              <div className="mt-0.5 text-gray-500">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">{employee.address}</p>
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default EmployeeCard;