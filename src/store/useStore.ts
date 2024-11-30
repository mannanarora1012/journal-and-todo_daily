import { create } from 'zustand';
import { TodoItem, JournalEntry } from '../types';
import { loadFromStorage, saveToStorage } from '../utils/storage';

interface AppState {
  todos: TodoItem[];
  journalEntries: JournalEntry[];
  selectedDate: string;
  addTodo: (text: string, date: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateJournalEntry: (date: string, content: string) => void;
  setSelectedDate: (date: string) => void;
}

// Load initial state from localStorage
const initialData = loadFromStorage() || {
  todos: [],
  journalEntries: [],
  selectedDate: new Date().toISOString().split('T')[0],
};

export const useStore = create<AppState>((set, get) => ({
  ...initialData,
  
  addTodo: (text, date) =>
    set((state) => {
      const newState = {
        todos: [
          ...state.todos,
          { id: crypto.randomUUID(), text, completed: false, date },
        ],
      };
      saveToStorage({ ...get(), ...newState });
      return newState;
    }),
    
  toggleTodo: (id) =>
    set((state) => {
      const newState = {
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ),
      };
      saveToStorage({ ...get(), ...newState });
      return newState;
    }),

  deleteTodo: (id) =>
    set((state) => {
      const newState = {
        todos: state.todos.filter((todo) => todo.id !== id),
      };
      saveToStorage({ ...get(), ...newState });
      return newState;
    }),
    
  updateJournalEntry: (date, content) =>
    set((state) => {
      const existingEntryIndex = state.journalEntries.findIndex(
        (entry) => entry.date === date
      );
      
      let newState;
      if (existingEntryIndex >= 0) {
        const newEntries = [...state.journalEntries];
        newEntries[existingEntryIndex] = {
          ...newEntries[existingEntryIndex],
          content,
        };
        newState = { journalEntries: newEntries };
      } else {
        newState = {
          journalEntries: [
            ...state.journalEntries,
            { id: crypto.randomUUID(), date, content },
          ],
        };
      }
      
      saveToStorage({ ...get(), ...newState });
      return newState;
    }),
    
  setSelectedDate: (date) => {
    const newState = { selectedDate: date };
    saveToStorage({ ...get(), ...newState });
    set(newState);
  },
}));