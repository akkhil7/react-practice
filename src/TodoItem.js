import React, { useState } from "react";

export default function TodoItem({ todo, updateTodo, deleteTodo }) {
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  const toggleTodo = () => {
    const updatedTodo = {
      ...todo,
      complete: !todo.complete,
    };
    updateTodo(updatedTodo);
  };

  const onClickTodo = () => {
    setShowEdit(true);
  };

  const onEditTodo = (e) => {
    e.preventDefault();
    const editedTodo = {
      ...todo,
      text: newTodo,
    };
    updateTodo(editedTodo);
    setNewTodo("");
    setShowEdit(false);
  };

  const toggleDeleteButton = () => {
    setShowDelete((prev) => !prev);
  };

  return (
    <div
      className="todo-item-wrapper"
      onMouseEnter={toggleDeleteButton}
      onMouseLeave={toggleDeleteButton}
    >
      <button onClick={toggleTodo} className="toggle-btn">
        {todo.complete ? "✓" : ""}
      </button>
      {showEdit ? (
        <form onSubmit={onEditTodo}>
          <input
            type="text"
            onChange={({ target: { value } }) => setNewTodo(value)}
            className="edit-input"
          />
        </form>
      ) : (
        <span
          style={{
            textDecoration: todo.complete ? "line-through" : "none",
          }}
          className="todo-content"
          onClick={onClickTodo}
        >
          {todo.text}
        </span>
      )}
      {showDelete ? (
        <button onClick={deleteTodo.bind(null, todo.id)} className="delete-btn">
          X
        </button>
      ) : null}
    </div>
  );
}
