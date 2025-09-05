"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ id: null, name: "", age: "", kelas: "" });

  // 🔹 Ambil data dari API
  const fetchStudents = async () => {
    try {
      const res = await fetch("/api/students");
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error("❌ Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // 🔹 Tambah / Update data
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.id) {
      // UPDATE
      await fetch("/api/students", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      // CREATE
      await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }

    setForm({ id: null, name: "", age: "", kelas: "" }); // reset form
    fetchStudents();
  };

  // 🔹 Hapus data
  const handleDelete = async (id) => {
    await fetch("/api/students", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchStudents();
  };

  // 🔹 Isi form saat klik Edit
  const handleEdit = (student) => {
    setForm({
      id: student._id, // gunakan _id dari MongoDB
      name: student.name,
      age: student.age,
      kelas: student.kelas,
    });
  };

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">📚 CRUD Siswa</h1>

      {/* Form Input */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-4 rounded shadow-md mb-6 space-y-3"
      >
        <input
          type="text"
          placeholder="Nama"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="number"
          placeholder="Umur"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="text"
          placeholder="Kelas"
          value={form.kelas}
          onChange={(e) => setForm({ ...form, kelas: e.target.value })}
          className="border p-2 w-full rounded"
          required
        />
        <button
          type="submit"
          className={`px-4 py-2 rounded text-white ${
            form.id ? "bg-yellow-500" : "bg-blue-500"
          }`}
        >
          {form.id ? "Update" : "Tambah"}
        </button>
      </form>

      {/* Tabel Data */}
      <table className="w-full border-collapse border text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Nama</th>
            <th className="border p-2">Umur</th>
            <th className="border p-2">Kelas</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td className="border p-2">{s.name}</td>
              <td className="border p-2">{s.age}</td>
              <td className="border p-2">{s.kelas}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleEdit(s)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(s._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
