import React, { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isToday,
  isSameMonth,
  addMonths,
  subMonths,
  parseISO,
} from 'date-fns';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Calendar: React.FC = () => {
  const { selectedDate, setSelectedDate, todos, journalEntries } = useStore();
  const [currentMonth, setCurrentMonth] = useState(parseISO(selectedDate));
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  
  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const hasContent = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return (
      todos.some((todo) => todo.date === dateStr) ||
      journalEntries.some((entry) => entry.date === dateStr)
    );
  };

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDateSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const newDate = e.target.value;
      const parsedDate = parseISO(newDate);
      if (isNaN(parsedDate.getTime())) {
        throw new Error('Invalid date');
      }
      setSelectedDate(newDate);
      setCurrentMonth(parsedDate);
      setIsDatePickerOpen(false);
    } catch (error) {
      console.error('Invalid date selected');
    }
  };

  return (
    <div className="cute-card p-6">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={handlePrevMonth}
          className="cute-button text-purple-600 hover:bg-purple-100"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="relative">
          <button
            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
            className="text-xl font-semibold flex items-center gap-2 text-purple-700 hover:text-purple-800 transition-colors cute-button"
          >
            <CalendarIcon className="w-5 h-5" />
            {format(currentMonth, 'MMMM yyyy')}
          </button>
          
          {isDatePickerOpen && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white p-2 rounded-xl shadow-lg border border-purple-100 z-10">
              <input
                type="date"
                onChange={handleDateSelect}
                value={selectedDate}
                className="cute-input text-purple-700 w-full"
              />
            </div>
          )}
        </div>
        <button 
          onClick={handleNextMonth}
          className="cute-button text-purple-600 hover:bg-purple-100"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-purple-600 py-2"
          >
            {day}
          </div>
        ))}
        
        {days.map((day) => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const isSelected = dateStr === selectedDate;
          const hasContentForDate = hasContent(day);
          
          return (
            <button
              key={day.toString()}
              onClick={() => setSelectedDate(dateStr)}
              className={`
                p-2 text-sm rounded-xl relative transition-all hover:scale-110
                ${isToday(day) ? 'font-bold' : ''}
                ${
                  isSelected
                    ? 'bg-purple-600 text-white shadow-lg scale-110 font-semibold'
                    : 'hover:bg-purple-100'
                }
                ${
                  !isSameMonth(day, currentMonth)
                    ? 'text-purple-300'
                    : isSelected
                    ? 'text-white'
                    : 'text-purple-800'
                }
              `}
            >
              {format(day, 'd')}
              {hasContentForDate && (
                <span className={`
                  absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 
                  ${isSelected ? 'bg-white' : 'bg-pink-400'} 
                  rounded-full
                `} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};