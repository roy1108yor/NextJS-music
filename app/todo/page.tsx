'use client';
import { useState, useEffect } from 'react';

export default function TodoApp() {
  const [todos, setTodos] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTodos = localStorage.getItem('todos');
      return savedTodos ? JSON.parse(savedTodos) : [];
    }
    return [];
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [editText, setEditText] = useState('');
  const [operationHistory, setOperationHistory] = useState([]);

  useEffect(() => {
      if (typeof window !== 'undefined') {
          localStorage.setItem('todos', JSON.stringify(todos));
      }
  }, [todos]);

  useEffect(() => {
      const fetchHistory = async () => {
          const response = await fetch('/api/history');
          const data = await response.json();
          setOperationHistory(data);
      };
      fetchHistory();
  }, []);

  const addTodo = () => {
      if (newTodo.trim()) {
          setTodos([...todos, { text: newTodo, completed: false }]);
          setNewTodo('');
      }
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const toggleComplete = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const startEditing = (index) => {
    setEditingTodo(index);
    setEditText(todos[index].text);
  };

  const editTodo = (index) => {
    if (editText.trim()) {
      setTodos(
        todos.map((todo, i) => (i === index ? { ...todo, text: editText } : todo))
      );
      setEditingTodo(null);
      setEditText('');
    }
  };

  const cancelEditing = () => {
    setEditingTodo(null);
    setEditText('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <h1>Todo Application</h1>
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo"
          style={{ padding: '10px', fontSize: '16px', marginRight: '10px', width: '250px' }}
        />
        <button onClick={addTodo} style={{ padding: '10px', fontSize: '16px' }}>
          Add
        </button>
      </div>
      <ul style={{ listStyleType: 'none', padding: 0, width: '300px' }}>
        {todos.map((todo, index) => (
          <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #ccc' }}>
            {editingTodo === index ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={{ padding: '10px', fontSize: '16px', marginRight: '10px', width: '150px' }}
                />
                <button onClick={() => editTodo(index)} style={{ marginRight: '10px' }}>
                  Save
                </button>
                <button onClick={cancelEditing}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    cursor: 'pointer'
                  }}
                  onClick={() => toggleComplete(index)}
                >
                  {todo.text}
                </span>
                <div>
                  <button onClick={() => startEditing(index)} style={{ marginRight: '10px' }}>
                    Edit
                  </button>
                  <button onClick={() => deleteTodo(index)}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}