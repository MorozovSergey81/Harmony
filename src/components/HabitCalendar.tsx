import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTodayDateString, formatDateString } from '../utils/date';

interface Habit {
  id: string;
  title: string;
  description?: string;
  category: string;
  color: string;
  currentStreak: number;
  bestStreak: number;
  completedDates: string[];
  createdAt: string;
  dailyGoal: number;
  timeOfDay: string;
}

interface HabitCalendarProps {
  completedDates: string[];
  habits: Habit[];
  onDateClick?: (date: string) => void;
}

const HabitCalendar: React.FC<HabitCalendarProps> = ({ completedDates, habits, onDateClick }) => {
  const { t, language } = useLanguage();
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const today = getTodayDateString();
  
  const getMonthName = (month: number) => {
    const months = [
      'january', 'february', 'march', 'april', 'may', 'june',
      'july', 'august', 'september', 'october', 'november', 'december'
    ];
    return t(months[month]);
  };

  const getWeekDays = () => {
    if (language === 'en') {
      return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    } else {
      return ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    }
  };

  const checkIfAllHabitsCompletedForDate = (dateString: string) => {
    if (habits.length === 0) return false;
    
    return habits.every(habit => {
      const dayCompletions = habit.completedDates.filter((d: string) => d === dateString).length;
      return dayCompletions >= habit.dailyGoal;
    });
  };
  
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = formatDateString(date.toISOString());
      days.push(dateString);
    }
    
    return days;
  };
  
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };
  
  const days = getDaysInMonth(currentDate);
  const weekDays = getWeekDays();
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-xl border border-gray-100 dark:border-gray-700 p-3 sm:p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
          {t('calendar')}
        </h3>
        <div className="flex items-center space-x-1 sm:space-x-2">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-1.5 sm:p-2 text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors"
          >
            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
          <div className="text-center min-w-[100px] sm:min-w-[140px] md:min-w-[160px]">
            <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
              {getMonthName(currentDate.getMonth())}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {currentDate.getFullYear()}
            </div>
          </div>
          <button
            onClick={() => navigateMonth('next')}
            className="p-1.5 sm:p-2 text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors"
          >
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
        </div>
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
        {/* Week day headers */}
        {weekDays.map((day) => (
          <div key={day} className="h-6 sm:h-8 flex items-center justify-center">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              {day}
            </span>
          </div>
        ))}
        
        {/* Calendar days */}
        {days.map((date, index) => (
          <div key={index} className="h-6 sm:h-8 flex items-center justify-center">
            {date ? (
              <button
                onClick={() => onDateClick?.(date)}
                className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full text-xs font-medium transition-all ${
                  date === today && checkIfAllHabitsCompletedForDate(date)
                    ? 'bg-emerald-500 text-white shadow-md ring-2 ring-emerald-200 dark:ring-emerald-800'
                    : date === today
                    ? 'bg-blue-500 text-white shadow-md ring-2 ring-blue-200 dark:ring-blue-800'
                    : completedDates.includes(date)
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {new Date(date).getDate()}
              </button>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HabitCalendar;
