import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const todos = await prisma.todo.findMany({ orderBy: { id: "desc" } });
    res.json(todos);
  } 
  else if (req.method === "POST") {
    const { title } = req.body;
    const todo = await prisma.todo.create({
      data: { title }
    });
    res.json(todo);
  }
}
