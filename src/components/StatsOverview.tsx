import React from 'react';
import { Target, TrendingUp, Calendar, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Habit as BaseHabit, HabitCompletion } from '../types';

interface Habit extends BaseHabit {
  completions: HabitCompletion[];
}

interface StatsOverviewProps {
  habits: Habit[];
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ habits }) => {
  const { t } = useLanguage();
  const today = new Date().toISOString().split('T')[0];
  
  const todayCompleted = habits.filter(h => h.completions.some(c => c.date === today)).length;
  const totalHabits = habits.length;
  const totalCompletions = habits.reduce((sum, h) => sum + h.completions.length, 0);
  const longestStreak = habits.reduce((max, h) => Math.max(max, h.best_streak), 0);

  const completionRate = totalHabits > 0 ? Math.round((todayCompleted / totalHabits) * 100) : 0;

  const stats = [
    {
      title: t('todayCompleted'),
      value: `${todayCompleted}/${totalHabits}`,
      subtitle: `${completionRate}% ${t('completed')}`,
      icon: Target,
      color: 'emerald',
      bgGradient: 'from-emerald-500 to-teal-500'
    },
    {
      title: t('longestStreak'),
      value: longestStreak,
      subtitle: longestStreak === 1 ? t('day') : longestStreak < 5 ? t('days') : t('days'),
      icon: TrendingUp,
      color: 'blue',
      bgGradient: 'from-blue-500 to-indigo-500'
    },
    {
      title: t('totalCompletions'),
      value: totalCompletions,
      subtitle: t('allTime'),
      icon: Calendar,
      color: 'purple',
      bgGradient: 'from-purple-500 to-pink-500'
    },
    {
      title: t('activeHabits'),
      value: totalHabits,
      subtitle: t('tracked'),
      icon: Award,
      color: 'orange',
      bgGradient: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-xl border border-gray-100 dark:border-gray-700 p-6 hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.bgGradient} shadow-lg`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.subtitle}</div>
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">{stat.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;
