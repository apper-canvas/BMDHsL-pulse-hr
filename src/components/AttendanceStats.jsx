import { motion } from 'framer-motion';
import { BarChart2, PieChart, Clock, Calendar, TrendingUp, Award } from 'lucide-react';

const AttendanceStats = ({ stats }) => {
  // Prepare data for bar chart
  const barChartData = [
    { label: 'Present', value: stats.present, color: 'bg-green-500' },
    { label: 'Absent', value: stats.absent, color: 'bg-red-500' },
    { label: 'Late', value: stats.late, color: 'bg-yellow-500' }
  ];
  
  // Calculate max value for proper scaling
  const maxBarValue = Math.max(...barChartData.map(d => d.value));
  
  // Calculate percentages for pie chart
  const totalDays = stats.present + stats.absent + stats.late;
  const presentPercentage = Math.round((stats.present / totalDays) * 100);
  const absentPercentage = Math.round((stats.absent / totalDays) * 100);
  const latePercentage = Math.round((stats.late / totalDays) * 100);
  
  // Trend data for line chart
  const trendData = stats.monthlyTrend;
  const maxTrendValue = Math.max(...trendData);

  return (
    <div className="space-y-8">
      <h3 className="text-lg font-semibold mb-2">Attendance Statistics Overview</h3>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="neu-card flex items-center">
          <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3 text-green-600 dark:text-green-400 mr-4">
            <Calendar size={24} />
          </div>
          <div>
            <div className="text-sm text-surface-500 dark:text-surface-400">Presence Rate</div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {presentPercentage}%
            </div>
          </div>
        </div>
        
        <div className="neu-card flex items-center">
          <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3 text-blue-600 dark:text-blue-400 mr-4">
            <Clock size={24} />
          </div>
          <div>
            <div className="text-sm text-surface-500 dark:text-surface-400">Avg Working Hours</div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {stats.workingHours.average}h
            </div>
          </div>
        </div>
        
        <div className="neu-card flex items-center">
          <div className="rounded-full bg-yellow-100 dark:bg-yellow-900/30 p-3 text-yellow-600 dark:text-yellow-400 mr-4">
            <Award size={24} />
          </div>
          <div>
            <div className="text-sm text-surface-500 dark:text-surface-400">Punctuality</div>
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {stats.punctuality}%
            </div>
          </div>
        </div>
        
        <div className="neu-card flex items-center">
          <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-3 text-purple-600 dark:text-purple-400 mr-4">
            <TrendingUp size={24} />
          </div>
          <div>
            <div className="text-sm text-surface-500 dark:text-surface-400">Overtime Hours</div>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {stats.workingHours.overtime}h
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Attendance distribution chart */}
        <div className="bg-white dark:bg-surface-800 p-6 rounded-xl shadow-sm border border-surface-200 dark:border-surface-700">
          <div className="flex items-center mb-4">
            <BarChart2 size={20} className="text-primary mr-2" />
            <h4 className="font-medium">Attendance Distribution</h4>
          </div>
          
          <div className="space-y-3">
            {barChartData.map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-surface-600 dark:text-surface-400">{item.label}</span>
                  <span className="text-sm font-medium">{item.value} days</span>
                </div>
                <div className="w-full bg-surface-100 dark:bg-surface-700 rounded-full h-2.5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.value / maxBarValue) * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className={`${item.color} h-2.5 rounded-full`} 
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <div className="flex items-center mb-4">
              <TrendingUp size={20} className="text-primary mr-2" />
              <h4 className="font-medium">Monthly Punctuality Trend</h4>
            </div>
            
            <div className="flex items-end h-[120px] space-x-2">
              {trendData.map((value, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(value / maxTrendValue) * 100}%` }}
                    transition={{ duration: 0.7, delay: index * 0.1 }}
                    className="w-full bg-primary rounded-t"
                  ></motion.div>
                  <div className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                    M{index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Pie chart and analysis */}
        <div className="bg-white dark:bg-surface-800 p-6 rounded-xl shadow-sm border border-surface-200 dark:border-surface-700">
          <div className="flex items-center mb-4">
            <PieChart size={20} className="text-primary mr-2" />
            <h4 className="font-medium">Attendance Breakdown</h4>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
            {/* Simple visual pie representation */}
            <div className="relative w-[140px] h-[140px] mx-auto md:mx-0">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                {/* Background circle */}
                <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#e0e0e0" strokeWidth="3"></circle>
                
                {/* Present segment */}
                <motion.circle
                  initial={{ strokeDasharray: "0 100" }}
                  animate={{ strokeDasharray: `${presentPercentage} 100` }}
                  transition={{ duration: 1 }}
                  cx="18"
                  cy="18"
                  r="15.91549430918954"
                  fill="transparent"
                  stroke="#22c55e" // Green-500
                  strokeWidth="3"
                  strokeDasharray={`${presentPercentage} 100`}
                  strokeDashoffset="25"
                ></motion.circle>
                
                {/* Late segment */}
                <motion.circle
                  initial={{ strokeDasharray: "0 100" }}
                  animate={{ strokeDasharray: `${latePercentage} 100` }}
                  transition={{ duration: 1, delay: 0.3 }}
                  cx="18"
                  cy="18"
                  r="15.91549430918954"
                  fill="transparent"
                  stroke="#eab308" // Yellow-500
                  strokeWidth="3"
                  strokeDasharray={`${latePercentage} 100`}
                  strokeDashoffset={25 - presentPercentage}
                ></motion.circle>
                
                {/* Absent segment */}
                <motion.circle
                  initial={{ strokeDasharray: "0 100" }}
                  animate={{ strokeDasharray: `${absentPercentage} 100` }}
                  transition={{ duration: 1, delay: 0.6 }}
                  cx="18"
                  cy="18"
                  r="15.91549430918954"
                  fill="transparent"
                  stroke="#ef4444" // Red-500
                  strokeWidth="3"
                  strokeDasharray={`${absentPercentage} 100`}
                  strokeDashoffset={25 - presentPercentage - latePercentage}
                ></motion.circle>
                
                {/* Center text */}
                <text x="18" y="18" textAnchor="middle" dominantBaseline="middle" className="fill-surface-800 dark:fill-surface-100 text-lg font-medium">
                  {totalDays}
                </text>
                <text x="18" y="23" textAnchor="middle" dominantBaseline="middle" className="fill-surface-600 dark:fill-surface-400 text-xs">
                  days
                </text>
              </svg>
            </div>
            
            {/* Legend */}
            <div className="mt-4 md:mt-0 space-y-3 mx-auto md:mx-0">
              <div className="flex items-center">
                <span className="w-4 h-4 inline-block rounded-full bg-green-500 mr-2"></span>
                <span className="text-sm text-surface-700 dark:text-surface-300">Present ({presentPercentage}%)</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 inline-block rounded-full bg-yellow-500 mr-2"></span>
                <span className="text-sm text-surface-700 dark:text-surface-300">Late ({latePercentage}%)</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 inline-block rounded-full bg-red-500 mr-2"></span>
                <span className="text-sm text-surface-700 dark:text-surface-300">Absent ({absentPercentage}%)</span>
              </div>
            </div>
          </div>
          
          {/* Summary */}
          <div className="mt-6 p-4 bg-surface-50 dark:bg-surface-700 rounded-lg">
            <h5 className="font-medium mb-2">Monthly Summary</h5>
            <p className="text-sm text-surface-600 dark:text-surface-400">
              You've worked for a total of <span className="font-medium text-primary">{stats.workingHours.total} hours</span> this month,
              with an average of <span className="font-medium text-primary">{stats.workingHours.average} hours</span> per day.
              Your punctuality rate is <span className="font-medium text-primary">{stats.punctuality}%</span>,
              which is {stats.punctuality > 90 ? 'excellent!' : stats.punctuality > 80 ? 'good.' : 'below target.'}
            </p>
          </div>
        </div>
      </div>
      
      {/* Work hours analysis */}
      <div className="bg-white dark:bg-surface-800 p-6 rounded-xl shadow-sm border border-surface-200 dark:border-surface-700">
        <div className="flex items-center mb-4">
          <Clock size={20} className="text-primary mr-2" />
          <h4 className="font-medium">Working Hours Analysis</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-surface-50 dark:bg-surface-700 rounded-lg">
            <div className="text-sm text-surface-500 dark:text-surface-400 mb-1">Total Hours</div>
            <div className="text-2xl font-bold">{stats.workingHours.total}</div>
            <div className="text-xs text-surface-500 dark:text-surface-400 mt-1">hours this month</div>
          </div>
          
          <div className="p-4 bg-surface-50 dark:bg-surface-700 rounded-lg">
            <div className="text-sm text-surface-500 dark:text-surface-400 mb-1">Average Daily</div>
            <div className="text-2xl font-bold">{stats.workingHours.average}</div>
            <div className="text-xs text-surface-500 dark:text-surface-400 mt-1">hours per workday</div>
          </div>
          
          <div className="p-4 bg-surface-50 dark:bg-surface-700 rounded-lg">
            <div className="text-sm text-surface-500 dark:text-surface-400 mb-1">Overtime</div>
            <div className="text-2xl font-bold">{stats.workingHours.overtime}</div>
            <div className="text-xs text-surface-500 dark:text-surface-400 mt-1">extra hours logged</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceStats;