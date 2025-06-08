import { Pool } from 'pg';
import type { DBUser, DBHabit, DBHabitCompletion } from '../types/db';

// Конфигурация подключения к базе данных
const pool = new Pool({
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  database: process.env.POSTGRES_DB || 'harmony',
});

// Функции для работы с пользователями
export const userQueries = {
  createUser: async (email: string, username: string, passwordHash: string): Promise<DBUser> => {
    const query = `
      INSERT INTO users (email, username, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, email, username, created_at
    `;
    const values = [email, username, passwordHash];
    const result = await pool.query<DBUser>(query, values);
    return result.rows[0];
  },

  getUserByEmail: async (email: string): Promise<DBUser | null> => {
    const query = `
      SELECT id, email, username, password_hash, created_at
      FROM users
      WHERE email = $1
    `;
    const result = await pool.query<DBUser>(query, [email]);
    return result.rows[0] || null;
  },
};

// Функции для работы с привычками
export const habitQueries = {
  createHabit: async (userId: string, habit: Omit<DBHabit, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'current_streak' | 'best_streak'>): Promise<DBHabit> => {
    const query = `
      INSERT INTO habits (
        user_id, title, description, category,
        color, daily_goal, time_of_day
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const values = [
      userId,
      habit.title,
      habit.description,
      habit.category,
      habit.color,
      habit.daily_goal,
      habit.time_of_day,
    ];
    const result = await pool.query<DBHabit>(query, values);
    return result.rows[0];
  },

  getUserHabits: async (userId: string): Promise<DBHabit[]> => {
    const query = `
      SELECT h.*, 
             array_agg(json_build_object(
               'id', hc.id,
               'completed_at', hc.completed_at,
               'date', hc.date
             )) as completions
      FROM habits h
      LEFT JOIN habit_completions hc ON h.id = hc.habit_id
      WHERE h.user_id = $1
      GROUP BY h.id
    `;
    const result = await pool.query<DBHabit>(query, [userId]);
    return result.rows;
  },

  updateHabit: async (habitId: string, updates: Partial<DBHabit>): Promise<DBHabit> => {
    const setClause = Object.keys(updates)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ');
    const query = `
      UPDATE habits
      SET ${setClause}
      WHERE id = $1
      RETURNING *
    `;
    const values = [habitId, ...Object.values(updates)];
    const result = await pool.query<DBHabit>(query, values);
    return result.rows[0];
  },

  deleteHabit: async (habitId: string): Promise<DBHabit> => {
    const query = `
      DELETE FROM habits
      WHERE id = $1
      RETURNING *
    `;
    const result = await pool.query<DBHabit>(query, [habitId]);
    return result.rows[0];
  },
};

// Функции для работы с выполнениями привычек
export const completionQueries = {
  addCompletion: async (habitId: string, date: string): Promise<DBHabitCompletion> => {
    const query = `
      INSERT INTO habit_completions (habit_id, date)
      VALUES ($1, $2)
      RETURNING *
    `;
    const result = await pool.query<DBHabitCompletion>(query, [habitId, date]);
    return result.rows[0];
  },

  removeCompletion: async (completionId: string): Promise<DBHabitCompletion> => {
    const query = `
      DELETE FROM habit_completions
      WHERE id = $1
      RETURNING *
    `;
    const result = await pool.query<DBHabitCompletion>(query, [completionId]);
    return result.rows[0];
  },

  getCompletions: async (habitId: string, startDate: string, endDate: string): Promise<DBHabitCompletion[]> => {
    const query = `
      SELECT *
      FROM habit_completions
      WHERE habit_id = $1
        AND date BETWEEN $2 AND $3
      ORDER BY completed_at
    `;
    const result = await pool.query<DBHabitCompletion>(query, [habitId, startDate, endDate]);
    return result.rows;
  },
};

export default pool; 