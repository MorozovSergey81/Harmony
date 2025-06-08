import { format, startOfDay } from 'date-fns';

export const getTodayDateString = (): string => {
  const today = startOfDay(new Date());
  return format(today, 'yyyy-MM-dd');
};

export const formatDateString = (date: string): string => {
  return format(new Date(date), 'yyyy-MM-dd');
}; 