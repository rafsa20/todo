import { useState, useEffect } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const res = await fetch("/api/todo");
    setTodos(await res.json());
  }

  async function addTodo(e) {
    e.preventDefault();
    if (!title) return;
    await fetch("/api/todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    });
    setTitle("");
    fetchTodos();
  }

  async function completeTodo(id) {
    await fetch(`/api/todo/${id}`, { method: "PUT" });
    fetchTodos();
  }

  async function deleteTodo(id) {
    await fetch(`/api/todo/${id}`, { method: "DELETE" });
    fetchTodos();
  }

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto" }}>
      <h1>📌 Todo App</h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          placeholder="Tambah todo..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: "8px", width: "70%" }}
        />
        <button type="submit" style={{ padding: "8px 12px", marginLeft: "5px" }}>
          Add
        </button>
      </form>

      <ul style={{ marginTop: "20px" }}>
        {todos.map((t) => (
          <li key={t.id} style={{ margin: "8px 0" }}>
            <span style={{ textDecoration: t.completed ? "line-through" : "none" }}>
              {t.title}
            </span>
            <button onClick={() => completeTodo(t.id)} style={{ marginLeft: "10px" }}>
              ✅
            </button>
            <button onClick={() => deleteTodo(t.id)} style={{ marginLeft: "5px", color: "red" }}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
