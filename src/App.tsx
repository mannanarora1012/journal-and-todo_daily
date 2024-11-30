import React from 'react';
import { Calendar } from './components/Calendar';
import { TodoList } from './components/TodoList';
import { JournalEntry } from './components/JournalEntry';
import { Footer } from './components/Footer';
import { BookHeart, Sparkles } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen p-4 sm:p-8 flex flex-col">
      <div className="max-w-7xl mx-auto flex-1 w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3">
          <BookHeart className="w-8 h-8" />
            DayScribe
          <Sparkles className="w-6 h-6" />
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="calendar-container">
              <Calendar />
            </div>
          </div>
          
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            <TodoList />
            <JournalEntry />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;