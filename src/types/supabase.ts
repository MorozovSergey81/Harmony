export type Habit = {
  id: string
  created_at: string
  title: string
  description?: string
  category: string
  color: string
  daily_goal: number
  time_of_day: string
  current_streak: number
  best_streak: number
}

export type HabitCompletion = {
  id: string
  habit_id: string
  date: string
  completed_at: string
}

export type Profile = {
  id: string
  username: string
  theme: 'light' | 'dark' | 'system'
} 