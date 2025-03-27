import { format, differenceInDays, addDays, parseISO, isValid } from 'date-fns';

// Format a date to a readable string
export const formatDate = (date, formatStr = 'MMM dd, yyyy') => {
  if (!date) return '';
  
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  
  if (!isValid(parsedDate)) return '';
  
  return format(parsedDate, formatStr);
};

// Calculate the number of days between two dates (inclusive)
export const getDaysBetween = (startDate, endDate) => {
  if (!startDate || !endDate) return 0;
  
  const start = typeof startDate === 'string' ? parseISO(startDate) : startDate;
  const end = typeof endDate === 'string' ? parseISO(endDate) : endDate;
  
  if (!isValid(start) || !isValid(end)) return 0;
  
  return differenceInDays(addDays(end, 1), start);
};

// Get today's date in YYYY-MM-DD format
export const getTodayDateString = () => {
  return format(new Date(), 'yyyy-MM-dd');
};

// Check if a date is in the past
export const isDateInPast = (date) => {
  if (!date) return false;
  
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  
  if (!isValid(parsedDate)) return false;
  
  return parsedDate < new Date();
};

// Get the current month's first and last day
export const getCurrentMonthRange = () => {
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  
  return {
    firstDay: format(firstDay, 'yyyy-MM-dd'),
    lastDay: format(lastDay, 'yyyy-MM-dd')
  };
};

// Get previous month's first and last day
export const getPreviousMonthRange = () => {
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const lastDay = new Date(today.getFullYear(), today.getMonth(), 0);
  
  return {
    firstDay: format(firstDay, 'yyyy-MM-dd'),
    lastDay: format(lastDay, 'yyyy-MM-dd')
  };
};