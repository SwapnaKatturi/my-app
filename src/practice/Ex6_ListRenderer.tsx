import { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

const initialTodos: Todo[] = [
  { id: 1, text: 'Learn useState', done: false },
  { id: 2, text: 'Learn useEffect', done: false },
  { id: 3, text: 'Debug this list', done: false },
];

/**
 * EXERCISE 6 (function component / hooks)
 * -----------------------------------------
 * Expected behavior: clicking a todo's text toggles its "done" state
 * (strikes it through) — and ONLY that todo, not the others.
 *
 * Bug: clicking any single item toggles ALL of them, or clicking has no
 * effect on the correct item. Look at how the clicked item is identified
 * inside the click handler.
 */
function ListRenderer() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  return (
    <div className="exercise">
      <h3>Ex6: Todo list (hooks)</h3>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            style={{
              textDecoration: todo.done ? 'line-through' : 'none',
              cursor: 'pointer',
            }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListRenderer;
