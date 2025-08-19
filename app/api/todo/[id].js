import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "PUT") {
    const todo = await prisma.todo.update({
      where: { id: Number(id) },
      data: { completed: true }
    });
    res.json(todo);
  } 
  else if (req.method === "DELETE") {
    await prisma.todo.delete({ where: { id: Number(id) } });
    res.json({ message: "Deleted" });
  }
}
