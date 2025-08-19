import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// UPDATE
export async function PUT(req, { params }) {
  const body = await req.json();
  const siswa = await prisma.siswa.update({
    where: { id: Number(params.id) },
    data: {
      nama: body.nama,
      kelas: body.kelas,
      jurusan: body.jurusan,
    },
  });
  return Response.json(siswa);
}

// DELETE
export async function DELETE(req, { params }) {
  await prisma.siswa.delete({ where: { id: Number(params.id) } });
  return Response.json({ message: "Data berhasil dihapus" });
}