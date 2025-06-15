import { useState } from 'react';

function isLocalStorageAvailable() {
  try {
    const testKey = '__test__';
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const localStorageAvailable = isLocalStorageAvailable();
  // Получаем значение из localStorage или используем initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (!localStorageAvailable) return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Создаем функцию для обновления значения
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Разрешаем value быть функцией
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Сохраняем состояние
      setStoredValue(valueToStore);
      
      // Сохраняем в localStorage
      if (localStorageAvailable) {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
} 