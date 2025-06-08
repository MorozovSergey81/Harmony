import React, { useState } from 'react';
import { Check, Edit, Trash2, TrendingUp, Clock, Minus } from 'lucide-react';
import EditHabitModal from './EditHabitModal';
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
  completedToday: number;
}

interface HabitCardProps {
  habit: Habit;
  onToggleCompletion: (id: string) => void;
  onRemoveCompletion: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Habit>) => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onToggleCompletion, onRemoveCompletion, onDelete, onUpdate }) => {
  const { t } = useLanguage();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const today = getTodayDateString();
  const todaysCompletions = habit.completedDates.filter(date => date === today).length;
  const isGoalReached = todaysCompletions >= habit.dailyGoal;

  const getWeekProgress = () => {
    const today = new Date();
    const weekDays = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateString = formatDateString(date.toISOString());
      const dayCompletions = habit.completedDates.filter(d => d === dateString).length;
      weekDays.push({
        date: dateString,
        completed: dayCompletions >= habit.dailyGoal,
        progress: Math.min(dayCompletions / habit.dailyGoal, 1)
      });
    }
    
    return weekDays;
  };

  const weekProgress = getWeekProgress();
  const completionRate = weekProgress.filter(day => day.completed).length;

  const getCategoryTranslation = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'Здоровье': 'health',
      'Фитнес': 'fitness', 
      'Продуктивность': 'productivity',
      'Обучение': 'learning',
      'Творчество': 'creativity',
      'Отношения': 'relationships',
      'Саморазвитие': 'selfDevelopment',
      'Другое': 'other'
    };
    return t(categoryMap[category] || 'other');
  };

  const getTimeOfDayTranslation = (timeOfDay: string) => {
    const timeMap: { [key: string]: string } = {
      'anytime': 'anytime',
      'morning': 'morning',
      'afternoon': 'afternoon', 
      'evening': 'evening',
      'night': 'night'
    };
    return t(timeMap[timeOfDay] || 'anytime');
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-xl border border-gray-100 dark:border-gray-700 p-3 sm:p-4 md:p-6 hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        {/* Header */}
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
              <div 
                className="w-3 h-3 sm:w-4 sm:h-4 rounded-full flex-shrink-0"
                style={{ backgroundColor: habit.color }}
              />
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base md:text-lg truncate">{habit.title}</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-2 line-clamp-2">{habit.description}</p>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                {getCategoryTranslation(habit.category)}
              </span>
              {habit.timeOfDay !== 'anytime' && (
                <span className="inline-flex items-center space-x-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                  <Clock className="h-3 w-3" />
                  <span>{getTimeOfDayTranslation(habit.timeOfDay)}</span>
                </span>
              )}
            </div>
          </div>
          <div className="flex space-x-1 flex-shrink-0 ml-2">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="p-1 sm:p-1.5 md:p-2 text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors"
            >
              <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
            <button
              onClick={() => onDelete(habit.id)}
              className="p-1 sm:p-1.5 md:p-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
          </div>
        </div>

        {/* Daily Goal Progress */}
        {habit.dailyGoal > 1 && (
          <div className="mb-3 sm:mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('dailyGoal')}: {todaysCompletions}/{habit.dailyGoal}
              </span>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {Math.round((todaysCompletions / habit.dailyGoal) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
              <div
                className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((todaysCompletions / habit.dailyGoal) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Week Progress */}
        <div className="mb-3 sm:mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">{t('weekProgress')}</span>
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{completionRate}/7</span>
          </div>
          <div className="flex space-x-1">
            {weekProgress.map((day, index) => (
              <div key={index} className="flex-1 space-y-1">
                <div
                  className={`h-2 rounded-full transition-colors ${
                    day.completed ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-gray-600'
                  }`}
                />
                {habit.dailyGoal > 1 && !day.completed && day.progress > 0 && (
                  <div
                    className="h-1 bg-emerald-300 dark:bg-emerald-600 rounded-full"
                    style={{ width: `${day.progress * 100}%` }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Streak */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">{t('streak')}</span>
          </div>
          <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm sm:text-base md:text-lg">
            {habit.currentStreak} {t('daysCount')}
          </span>
        </div>

        {/* Complete Today Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => onToggleCompletion(habit.id)}
            disabled={isGoalReached}
            className={`flex-1 py-2 sm:py-2.5 md:py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm md:text-base ${
              isGoalReached
                ? 'bg-emerald-500 text-white cursor-default'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-700 dark:hover:text-emerald-400 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-emerald-300 dark:hover:border-emerald-500'
            }`}
          >
            <Check className={`h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 ${isGoalReached ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`} />
            <span className="hidden sm:inline">
              {isGoalReached 
                ? (habit.dailyGoal === 1 ? t('completedToday') : `${t('completedTimes')} (${todaysCompletions}/${habit.dailyGoal})`)
                : (habit.dailyGoal === 1 ? t('markCompleted') : `${t('markCompleted')} (${todaysCompletions}/${habit.dailyGoal})`)
              }
            </span>
            <span className="sm:hidden">+</span>
          </button>
          
          {todaysCompletions > 0 && (
            <button
              onClick={() => onRemoveCompletion(habit.id)}
              className="px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/30 border-2 border-dashed border-red-300 dark:border-red-600"
            >
              <Minus className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
            </button>
          )}
        </div>
      </div>

      <EditHabitModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        habit={habit}
        onUpdate={onUpdate}
      />
    </>
  );
};

export default HabitCard;
