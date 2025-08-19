"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [siswa, setSiswa] = useState([]);
  const [form, setForm] = useState({ nama: "", kelas: "", jurusan: "" });
  const [editId, setEditId] = useState(null);

  // Ambil data siswa
  const fetchSiswa = async () => {
    const res = await fetch("/api/siswa");
    const data = await res.json();
    setSiswa(data);
  };

  useEffect(() => {
    fetchSiswa();
  }, []);

  // Tambah & Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await fetch(`/api/siswa/${editId}`, {
        method: "PUT",
        body: JSON.stringify(form),
      });
      setEditId(null);
    } else {
      await fetch("/api/siswa", {
        method: "POST",
        body: JSON.stringify(form),
      });
    }
    setForm({ nama: "", kelas: "", jurusan: "" });
    fetchSiswa();
  };

  // Hapus
  const handleDelete = async (id) => {
    await fetch(`/api/siswa/${id}`, { method: "DELETE" });
    fetchSiswa();
  };

  // Edit
  const handleEdit = (s) => {
    setForm({ nama: s.nama, kelas: s.kelas, jurusan: s.jurusan });
    setEditId(s.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-10">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-center mb-4">📋 Data Siswa</h1>

        {/* Form Input */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Nama"
            className="border p-2 rounded"
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Kelas"
            className="border p-2 rounded"
            value={form.kelas}
            onChange={(e) => setForm({ ...form, kelas: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Jurusan"
            className="border p-2 rounded"
            value={form.jurusan}
            onChange={(e) => setForm({ ...form, jurusan: e.target.value })}
            required
          />
          <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
            {editId ? "Update Data" : "Tambah Data"}
          </button>
        </form>

        {/* List Data */}
        <ul className="mt-6 space-y-2">
          {siswa.map((s) => (
            <li
              key={s.id}
              className="flex justify-between items-center bg-blue-50 p-3 rounded shadow-sm"
            >
              <div>
                <p className="font-semibold">{s.nama}</p>
                <p className="text-sm text-gray-600">
                  {s.kelas} - {s.jurusan}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(s)}
                  className="px-3 py-1 text-sm bg-yellow-400 rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(s.id)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
