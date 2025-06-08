import React, { useState } from 'react';
import { Plus, Target, Calendar } from 'lucide-react';
import { useHabits } from '../hooks/useHabits';
import { getTodayDateString, formatDateString } from '../utils/date';
import HabitCard from '../components/HabitCard';
import AddHabitModal from '../components/AddHabitModal';
import StatsOverview from '../components/StatsOverview';
import ThemeToggle from '../components/ThemeToggle';
import LanguageSelector from '../components/LanguageSelector';
import HabitCalendar from '../components/HabitCalendar';
import { useLanguage } from '../contexts/LanguageContext';
import type { Habit as BaseHabit, HabitCompletion } from '../types';

interface Habit extends BaseHabit {
  completions: HabitCompletion[];
}

const Index = () => {
  const { t } = useLanguage();
  const { habits, loading: habitsLoading, addHabit, updateHabit, deleteHabit, toggleHabitCompletion, removeHabitCompletion } = useHabits();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddHabit = async (habitData: Omit<BaseHabit, 'id' | 'created_at' | 'current_streak' | 'best_streak'>) => {
    try {
      await addHabit(habitData);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Failed to add habit:', error);
    }
  };

  const handleUpdateHabit = async (id: string, updates: Partial<BaseHabit>) => {
    try {
      await updateHabit(id, updates);
    } catch (error) {
      console.error('Failed to update habit:', error);
    }
  };

  const handleDeleteHabit = async (id: string) => {
    try {
      await deleteHabit(id);
    } catch (error) {
      console.error('Failed to delete habit:', error);
    }
  };

  const handleToggleCompletion = async (id: string) => {
    try {
      await toggleHabitCompletion(id);
    } catch (error) {
      console.error('Failed to toggle completion:', error);
    }
  };

  const handleRemoveCompletion = async (id: string) => {
    try {
      await removeHabitCompletion(id);
    } catch (error) {
      console.error('Failed to remove completion:', error);
    }
  };

  const allCompletedDates = habits.reduce((dates: string[], habit) => {
    return [...dates, ...(habit.completions?.map(c => c.date) || [])];
  }, []);

  if (habitsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">{t('loading')}...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-emerald-100 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4 md:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                <Target className="h-3 w-3 sm:h-4 sm:w-4 md:h-6 md:w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  {t('appTitle')}
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hidden sm:block">{t('appSubtitle')}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
              <ThemeToggle />
              <LanguageSelector />
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-2 py-1.5 sm:px-3 sm:py-2 md:px-6 md:py-3 rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-200 flex items-center space-x-1 sm:space-x-2 shadow-lg text-xs sm:text-sm md:text-base"
              >
                <Plus className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                <span className="hidden sm:inline">{t('addHabit')}</span>
                <span className="sm:hidden">+</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4 md:py-8">
        {/* Stats Overview */}
        <StatsOverview habits={habits} />

        {/* Calendar and Habits */}
        <div className="mt-4 sm:mt-6 md:mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Calendar */}
          <div className="lg:col-span-1">
            <HabitCalendar completedDates={allCompletedDates} habits={habits} />
          </div>
          
          {/* Habits */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-3 sm:mb-4 md:mb-6">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 dark:text-white">{t('myHabits')}</h2>
              <span className="bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-xs sm:text-sm px-2 py-1 rounded-full">
                {habits.length}
              </span>
            </div>

            {habits.length === 0 ? (
              <div className="text-center py-6 sm:py-8 md:py-12">
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900 dark:to-teal-900 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Target className="h-6 w-6 sm:h-8 sm:w-8 md:h-12 md:w-12 text-emerald-500 dark:text-emerald-400" />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-medium text-gray-900 dark:text-white mb-2">{t('startJourney')}</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">{t('addFirstHabit')}</p>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-colors"
                >
                  {t('addHabit')}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {habits.map(habit => (
                  <HabitCard
                    key={habit.id}
                    habit={habit}
                    onUpdate={handleUpdateHabit}
                    onDelete={handleDeleteHabit}
                    onToggleCompletion={handleToggleCompletion}
                    onRemoveCompletion={handleRemoveCompletion}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <AddHabitModal
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddHabit}
      />
    </div>
  );
};

export default Index;
