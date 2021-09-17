import React, { useState } from "react";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputTodo, setInputTodo] = useState("");

  const onAddTodo = (e) => {
    e.preventDefault();
    const newTodo = {
      id: todos.length + 1,
      text: inputTodo,
      complete: false,
    };
    setTodos([...todos, newTodo]);
    setInputTodo("");
  };

  const updateTodo = (todo) => {
    const updatedTodos = todos.map((t) => (t.id === todo.id ? todo : t));
    setTodos(updatedTodos);
  };

  const deleteTodo = (todoId) => {
    const filteredTodos = todos.filter(({ id }) => id !== todoId);
    setTodos(filteredTodos);
  };

  return (
    <div className="todo-list-wrapper">
      <h2> todos </h2>
      <form onSubmit={onAddTodo}>
        <input
          type="text"
          onChange={(e) => setInputTodo(e.target.value)}
          required
          className="add-todo-input"
        />
      </form>
      {todos.map((t) => (
        <TodoItem todo={t} updateTodo={updateTodo} deleteTodo={deleteTodo} />
      ))}
    </div>
  );
}
