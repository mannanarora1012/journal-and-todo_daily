import React, { useState } from 'react';
import { PlusCircle, CheckCircle, Circle, Trash2, ListTodo } from 'lucide-react';
import { useStore } from '../store/useStore';

export const TodoList: React.FC = () => {
  const { todos, selectedDate, addTodo, toggleTodo, deleteTodo } = useStore();
  const [newTodo, setNewTodo] = useState('');

  const filteredTodos = todos.filter((todo) => todo.date === selectedDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo.trim(), selectedDate);
      setNewTodo('');
    }
  };

  return (
    <div className="cute-card p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-purple-700">
        <ListTodo className="w-5 h-5" />
        Today's Tasks
      </h2>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            className="cute-input flex-1"
          />
          <button
            type="submit"
            className="cute-button bg-purple-500 text-white hover:bg-purple-600"
          >
            <PlusCircle className="w-6 h-6" />
          </button>
        </div>
      </form>

      <div className="space-y-3">
        {filteredTodos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center gap-3 p-3 hover:bg-purple-50 rounded-xl group transition-all"
          >
            <button
              onClick={() => toggleTodo(todo.id)}
              className="text-purple-400 hover:text-purple-600 transition-colors"
            >
              {todo.completed ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <Circle className="w-5 h-5" />
              )}
            </button>
            <span
              className={`flex-1 ${
                todo.completed ? 'line-through text-purple-300' : 'text-purple-700'
              }`}
            >
              {todo.text}
            </span>
            <button 
              onClick={() => deleteTodo(todo.id)}
              className="opacity-0 group-hover:opacity-100 text-pink-400 hover:text-pink-600 transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        {filteredTodos.length === 0 && (
          <p className="text-center text-purple-400 py-4">No tasks for today yet!</p>
        )}
      </div>
    </div>
  );
};