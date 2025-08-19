import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET semua data
export async function GET() {
  const siswa = await prisma.siswa.findMany({ orderBy: { id: "desc" } });
  return Response.json(siswa);
}

// POST tambah data
export async function POST(req) {
  const body = await req.json();
  const siswa = await prisma.siswa.create({
    data: {
      nama: body.nama,
      kelas: body.kelas,
      jurusan: body.jurusan,
    },
  });
  return Response.json(siswa);
}