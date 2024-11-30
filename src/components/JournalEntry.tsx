import React from 'react';
import { BookHeart, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';

export const JournalEntry: React.FC = () => {
  const { selectedDate, journalEntries, updateJournalEntry } = useStore();
  
  const currentEntry = journalEntries.find(
    (entry) => entry.date === selectedDate
  );

  return (
    <div className="cute-card p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-purple-700">
        <BookHeart className="w-5 h-5" />
        Journal Entry
        <Sparkles className="w-4 h-4 text-pink-500" />
      </h2>
      
      <textarea
        value={currentEntry?.content || ''}
        onChange={(e) => updateJournalEntry(selectedDate, e.target.value)}
        placeholder="Write your thoughts for today..."
        className="cute-input w-full h-64 resize-none"
      />
    </div>
  );
};