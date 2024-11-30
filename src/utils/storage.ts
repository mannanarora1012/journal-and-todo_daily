import { TodoItem, JournalEntry } from '../types';

interface StorageData {
  todos: TodoItem[];
  journalEntries: JournalEntry[];
  selectedDate: string;
}

const STORAGE_KEY = 'journal_app_data';

export const loadFromStorage = (): StorageData | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading data from storage:', error);
    return null;
  }
};

export const saveToStorage = (data: StorageData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data to storage:', error);
  }
};