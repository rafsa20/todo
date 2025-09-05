import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("❌ MONGO_URI is not defined. Cek file .env.local");
}

// Simpan koneksi global supaya tidak connect ulang tiap request
if (!global._mongooseConn) {
  global._mongooseConn = mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 20000, // timeout 20 detik
    dbName: "studentdb",             // 🔥 pastikan selalu ke studentdb
  });
}

const StudentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  kelas: String,
});

const Student =
  mongoose.models.Student || mongoose.model("Student", StudentSchema);

// 🔹 GET: ambil semua data
export async function GET() {
  try {
    await global._mongooseConn;
    const students = await Student.find();
    return Response.json(students);
  } catch (err) {
    console.error("❌ GET Error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}

// 🔹 POST: tambah data
export async function POST(req) {
  try {
    await global._mongooseConn;
    const body = await req.json();
    const student = new Student(body);
    await student.save();
    return Response.json(student, { status: 201 });
  } catch (err) {
    console.error("❌ POST Error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}

// 🔹 PUT: update data
export async function PUT(req) {
  try {
    await global._mongooseConn;
    const body = await req.json();
    const { id, ...data } = body; // ambil id + data baru
    const updated = await Student.findByIdAndUpdate(id, data, { new: true });
    if (!updated) {
      return Response.json({ error: "Student not found" }, { status: 404 });
    }
    return Response.json(updated);
  } catch (err) {
    console.error("❌ PUT Error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}

// 🔹 DELETE: hapus data
export async function DELETE(req) {
  try {
    await global._mongooseConn;
    const body = await req.json();
    const { id } = body;
    const deleted = await Student.findByIdAndDelete(id);
    if (!deleted) {
      return Response.json({ error: "Student not found" }, { status: 404 });
    }
    return Response.json({ message: "Student deleted" });
  } catch (err) {
    console.error("❌ DELETE Error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
