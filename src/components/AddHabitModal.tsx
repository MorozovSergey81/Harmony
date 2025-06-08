import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface NewHabit {
  title: string;
  description: string;
  category: string;
  color: string;
  dailyGoal: number;
  timeOfDay: string;
}

interface AddHabitModalProps {
  onClose: () => void;
  onAdd: (habit: NewHabit) => void;
}

const colors = [
  '#10B981', '#3B82F6', '#8B5CF6', '#F59E0B',
  '#EF4444', '#EC4899', '#14B8A6', '#F97316'
];

const AddHabitModal: React.FC<AddHabitModalProps> = ({ onClose, onAdd }) => {
  const { t } = useLanguage();
  
  const categories = [
    { key: 'health', value: 'Здоровье' },
    { key: 'fitness', value: 'Фитнес' },
    { key: 'productivity', value: 'Продуктивность' },
    { key: 'learning', value: 'Обучение' },
    { key: 'creativity', value: 'Творчество' },
    { key: 'relationships', value: 'Отношения' },
    { key: 'selfDevelopment', value: 'Саморазвитие' },
    { key: 'other', value: 'Другое' }
  ];

  const timesOfDay = [
    { key: 'anytime', value: 'anytime' },
    { key: 'morning', value: 'morning' },
    { key: 'afternoon', value: 'afternoon' },
    { key: 'evening', value: 'evening' },
    { key: 'night', value: 'night' }
  ];
  
  const [formData, setFormData] = useState<NewHabit>({
    title: '',
    description: '',
    category: categories[0].value,
    color: colors[0],
    dailyGoal: 1,
    timeOfDay: 'anytime'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onAdd(formData);
      setFormData({
        title: '',
        description: '',
        category: categories[0].value,
        color: colors[0],
        dailyGoal: 1,
        timeOfDay: 'anytime'
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-4 sm:p-6 animate-scale-in max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">{t('addHabitTitle')}</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('habitName')}
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder={t('habitNamePlaceholder')}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('description')}
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder={t('descriptionPlaceholder')}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('category')}
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              >
                {categories.map(category => (
                  <option key={category.key} value={category.value}>
                    {t(category.key)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('timeOfDay')}
              </label>
              <select
                value={formData.timeOfDay}
                onChange={(e) => setFormData({ ...formData, timeOfDay: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              >
                {timesOfDay.map(time => (
                  <option key={time.key} value={time.value}>
                    {t(time.key)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('dailyGoal')}
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={formData.dailyGoal}
              onChange={(e) => setFormData({ ...formData, dailyGoal: parseInt(e.target.value) || 1 })}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {t('timesPerDay')}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('color')}
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {colors.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData({ ...formData, color })}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    formData.color === color 
                      ? 'border-gray-400 dark:border-gray-300 scale-110 shadow-lg' 
                      : 'border-gray-200 dark:border-gray-600 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition-all"
            >
              {t('add')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHabitModal;
