import React, { createContext, useContext, useState } from 'react';

type Language = 'ru' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, any>) => string;
}

const translations = {
  ru: {
    appTitle: 'Harmony',
    appSubtitle: 'Управляйте своими привычками эффективно',
    addHabit: 'Добавить привычку',
    myHabits: 'Мои привычки',
    calendar: 'Календарь',
    startJourney: 'Начните свой путь',
    addFirstHabit: 'Добавьте свою первую привычку для отслеживания прогресса',
    january: 'Январь',
    february: 'Февраль',
    march: 'Март',
    april: 'Апрель',
    may: 'Май',
    june: 'Июнь',
    july: 'Июль',
    august: 'Август',
    september: 'Сентябрь',
    october: 'Октябрь',
    november: 'Ноябрь',
    december: 'Декабрь',
    // Auth translations
    signIn: 'Войти',
    signUp: 'Регистрация',
    signOut: 'Выйти',
    email: 'Email',
    password: 'Пароль',
    username: 'Имя пользователя',
    enterEmail: 'Введите email',
    enterPassword: 'Введите пароль',
    enterUsername: 'Введите имя пользователя',
    welcomeBack: 'Добро пожаловать обратно!',
    createAccount: 'Создайте новый аккаунт',
    needAccount: 'Нужен аккаунт? Зарегистрируйтесь',
    haveAccount: 'Уже есть аккаунт? Войдите',
    loading: 'Загрузка',
    error: 'Ошибка',
    success: 'Успешно',
    checkEmailConfirmation: 'Проверьте email для подтверждения регистрации',
    // Notifications
    notifications: 'Уведомления',
    noNotifications: 'Нет уведомлений',
    justNow: 'Только что',
    hoursAgo: '{{hours}} ч. назад',
    // Stats
    todayCompleted: 'Выполнено сегодня',
    completed: 'выполнено',
    longestStreak: 'Лучшая серия',
    totalCompletions: 'Всего выполнено',
    activeHabits: 'Активные привычки',
    tracked: 'отслеживается',
    allTime: 'за все время',
    day: 'день',
    days: 'дней',
    // Habit Card
    streak: 'Серия',
    daysCount: 'дней',
    completedToday: 'Выполнено сегодня',
    completedTimes: 'Выполнено',
    markCompleted: 'Отметить выполненным',
    // Forms
    habitName: 'Название привычки',
    habitNamePlaceholder: 'Введите название привычки',
    description: 'Описание',
    descriptionPlaceholder: 'Опишите вашу привычку',
    category: 'Категория',
    timeOfDay: 'Время дня',
    dailyGoal: 'Ежедневная цель',
    timesPerDay: 'раз в день',
    color: 'Цвет',
    cancel: 'Отмена',
    save: 'Сохранить',
    add: 'Добавить',
    // Categories
    health: 'Здоровье',
    fitness: 'Фитнес',
    productivity: 'Продуктивность',
    learning: 'Обучение',
    creativity: 'Творчество',
    relationships: 'Отношения',
    selfDevelopment: 'Саморазвитие',
    other: 'Другое',
    // Time of day
    anytime: 'В любое время',
    morning: 'Утро',
    afternoon: 'День',
    evening: 'Вечер',
    night: 'Ночь',
    // Modals
    editHabitTitle: 'Редактировать привычку',
    addHabitTitle: 'Новая привычка',
  },
  en: {
    appTitle: 'Harmony',
    appSubtitle: 'Manage your habits effectively',
    addHabit: 'Add Habit',
    myHabits: 'My Habits',
    calendar: 'Calendar',
    startJourney: 'Start Your Journey',
    addFirstHabit: 'Add your first habit to track progress',
    january: 'January',
    february: 'February',
    march: 'March',
    april: 'April',
    may: 'May',
    june: 'June',
    july: 'July',
    august: 'August',
    september: 'September',
    october: 'October',
    november: 'November',
    december: 'December',
    // Auth translations
    signIn: 'Sign In',
    signUp: 'Sign Up',
    signOut: 'Sign Out',
    email: 'Email',
    password: 'Password',
    username: 'Username',
    enterEmail: 'Enter email',
    enterPassword: 'Enter password',
    enterUsername: 'Enter username',
    welcomeBack: 'Welcome back!',
    createAccount: 'Create a new account',
    needAccount: 'Need an account? Sign up',
    haveAccount: 'Already have an account? Sign in',
    loading: 'Loading',
    error: 'Error',
    success: 'Success',
    checkEmailConfirmation: 'Check your email to confirm registration',
    // Notifications
    notifications: 'Notifications',
    noNotifications: 'No notifications',
    justNow: 'Just now',
    hoursAgo: '{{hours}} hours ago',
    // Stats
    todayCompleted: 'Completed Today',
    completed: 'completed',
    longestStreak: 'Longest Streak',
    totalCompletions: 'Total Completions',
    activeHabits: 'Active Habits',
    tracked: 'tracked',
    allTime: 'all time',
    day: 'day',
    days: 'days',
    // Habit Card
    streak: 'Streak',
    daysCount: 'days',
    completedToday: 'Completed Today',
    completedTimes: 'Completed',
    markCompleted: 'Mark Completed',
    // Forms
    habitName: 'Habit Name',
    habitNamePlaceholder: 'Enter habit name',
    description: 'Description',
    descriptionPlaceholder: 'Describe your habit',
    category: 'Category',
    timeOfDay: 'Time of Day',
    dailyGoal: 'Daily Goal',
    timesPerDay: 'times per day',
    color: 'Color',
    cancel: 'Cancel',
    save: 'Save',
    add: 'Add',
    // Categories
    health: 'Health',
    fitness: 'Fitness',
    productivity: 'Productivity',
    learning: 'Learning',
    creativity: 'Creativity',
    relationships: 'Relationships',
    selfDevelopment: 'Self Development',
    other: 'Other',
    // Time of day
    anytime: 'Anytime',
    morning: 'Morning',
    afternoon: 'Afternoon',
    evening: 'Evening',
    night: 'Night',
    // Modals
    editHabitTitle: 'Edit Habit',
    addHabitTitle: 'New Habit',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ru');

  const t = (key: string, params?: Record<string, any>) => {
    let translation = translations[language][key as keyof typeof translations[typeof language]] || key;
    
    if (params) {
      Object.keys(params).forEach(param => {
        translation = translation.replace(`{{${param}}}`, params[param]);
      });
    }
    
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
