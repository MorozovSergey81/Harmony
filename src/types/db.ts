export interface DBUser {
  id: string;
  email: string;
  username: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
}

export interface DBHabit {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  category: string;
  color: string;
  daily_goal: number;
  time_of_day: string;
  current_streak: number;
  best_streak: number;
  created_at: Date;
  updated_at: Date;
  completions?: DBHabitCompletion[];
}

export interface DBHabitCompletion {
  id: string;
  habit_id: string;
  completed_at: Date;
  date: string;
} 