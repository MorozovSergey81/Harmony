import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from './useLocalStorage';
import { getTodayDateString } from '../utils/date';
import type { Habit as BaseHabit, HabitCompletion } from '../types';

interface Habit extends BaseHabit {
  completions: HabitCompletion[];
}

export const useHabits = () => {
  const [loading, setLoading] = useState(false);
  const [habits, setHabits] = useLocalStorage<Habit[]>('habits', []);
  const [completions, setCompletions] = useLocalStorage<HabitCompletion[]>('habit-completions', []);

  const addHabit = useCallback(async (habitData: Omit<BaseHabit, 'id' | 'created_at' | 'current_streak' | 'best_streak'>) => {
    const newHabit: Habit = {
      id: uuidv4(),
      created_at: new Date().toISOString(),
      current_streak: 0,
      best_streak: 0,
      ...habitData,
      completions: []
    };

    setHabits(prev => [...prev, newHabit]);
    return newHabit;
  }, [setHabits]);

  const updateHabit = useCallback(async (id: string, updates: Partial<BaseHabit>) => {
    setHabits(prev => prev.map(habit => 
      habit.id === id ? { ...habit, ...updates } : habit
    ));
  }, [setHabits]);

  const deleteHabit = useCallback(async (id: string) => {
    setHabits(prev => prev.filter(habit => habit.id !== id));
    setCompletions(prev => prev.filter(completion => completion.habit_id !== id));
  }, [setHabits, setCompletions]);

  const toggleHabitCompletion = useCallback(async (habitId: string) => {
    const today = getTodayDateString();
    const todayCompletions = completions.filter(
      c => c.habit_id === habitId && c.date === today
    );

    if (todayCompletions.length === 0) {
      const newCompletion: HabitCompletion = {
        id: uuidv4(),
        habit_id: habitId,
        date: today,
        completed_at: new Date().toISOString()
      };

      setCompletions(prev => [...prev, newCompletion]);

      // Обновляем streak
      const habit = habits.find(h => h.id === habitId);
      if (habit) {
        const newStreak = habit.current_streak + 1;
        const newBestStreak = Math.max(habit.best_streak, newStreak);
        
        updateHabit(habitId, {
          current_streak: newStreak,
          best_streak: newBestStreak
        });
      }
    }
  }, [habits, completions, setCompletions, updateHabit]);

  const removeHabitCompletion = useCallback(async (habitId: string) => {
    const today = getTodayDateString();
    
    setCompletions(prev => 
      prev.filter(completion => 
        !(completion.habit_id === habitId && completion.date === today)
      )
    );

    // Обновляем streak
    const habit = habits.find(h => h.id === habitId);
    if (habit && habit.current_streak > 0) {
      updateHabit(habitId, {
        current_streak: habit.current_streak - 1
      });
    }
  }, [habits, setCompletions, updateHabit]);

  const habitsWithCompletions = habits.map(habit => ({
    ...habit,
    completions: completions.filter(c => c.habit_id === habit.id)
  }));

  return {
    habits: habitsWithCompletions,
    loading,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleHabitCompletion,
    removeHabitCompletion
  };
};
