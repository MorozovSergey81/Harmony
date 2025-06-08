# Harmony - Трекер привычек

Веб-приложение для отслеживания ежедневных привычек с поддержкой нескольких выполнений в день.

## Деплой на Vercel

1. Создайте аккаунт на [Vercel](https://vercel.com)

2. Установите Vercel CLI:
   ```bash
   npm install -g vercel
   ```

3. Залогиньтесь в Vercel:
   ```bash
   vercel login
   ```

4. Создайте базу данных PostgreSQL:
   - Зайдите на [Neon](https://neon.tech) или [Supabase](https://supabase.com)
   - Создайте новый проект
   - Получите строку подключения к базе данных

5. Настройте переменные окружения в Vercel:
   ```bash
   vercel env add POSTGRES_USER
   vercel env add POSTGRES_PASSWORD
   vercel env add POSTGRES_HOST
   vercel env add POSTGRES_PORT
   vercel env add POSTGRES_DB
   ```

6. Деплой приложения:
   ```bash
   vercel
   ```

7. После успешного деплоя, ваше приложение будет доступно по адресу:
   `https://your-app-name.vercel.app`

## Настройка базы данных

1. Установите PostgreSQL:
   ```bash
   # macOS (через Homebrew)
   brew install postgresql

   # Ubuntu/Debian
   sudo apt update
   sudo apt install postgresql postgresql-contrib
   ```

2. Создайте базу данных:
   ```bash
   # Войдите в PostgreSQL
   psql postgres

   # Создайте базу данных
   CREATE DATABASE harmony;

   # Подключитесь к базе данных
   \c harmony
   ```

3. Примените миграции:
   ```bash
   # Скопируйте содержимое файла migrations/001_initial_schema.sql
   # и выполните его в psql
   ```

4. Создайте файл .env в корне проекта:
   ```
   POSTGRES_USER=your_username
   POSTGRES_PASSWORD=your_password
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432
   POSTGRES_DB=harmony
   ```

## Установка и запуск

1. Установите зависимости:
   ```bash
   npm install
   ```

2. Запустите приложение:
   ```bash
   npm run dev
   ```

## Основные функции

- Создание и отслеживание привычек
- Поддержка нескольких выполнений в день
- Отслеживание серий выполнений
- Статистика и календарь
- Поддержка русского и английского языков

## Технологии

- React + TypeScript
- PostgreSQL
- Node.js
- Tailwind CSS

## 🌐 Live Demo

Visit the live application at: [https://morozovSergey81.github.io/Harmony/](https://morozovSergey81.github.io/Harmony/)

## 🚀 Features

- Track daily habits and routines
- Beautiful and responsive UI
- Modern design with Tailwind CSS
- Type-safe development with TypeScript

## 🛠️ Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- React Router
- GitHub Actions for CI/CD

## 🔨 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run typecheck` - Check TypeScript types
- `npm run lint` - Run ESLint

## 🚀 Deployment

The application is automatically deployed to GitHub Pages when changes are pushed to the main branch. The deployment process includes:

1. Type checking
2. Building the application
3. Deploying to GitHub Pages

You can check the deployment status in the [Actions tab](https://github.com/MorozovSergey81/Harmony/actions).

## 📝 License

MIT
