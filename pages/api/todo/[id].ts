import { prisma } from "../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const todoId = req.query.id;

  if (req.method === "DELETE") {
    const todo = await prisma.todo.delete({
      where: { id: todoId?.toString() },
    });

    res.json(todo);
  } else if (req.method === "PATCH") {
    const { title, text, done } = req.body;

    try {
      await prisma.todo.update({
        where: { id: todoId?.toString() },
        data: {
          title,
          text,
          done,
        },
      });

      res.status(200).json({ message: "Todo Updated!" });
    } catch (error) {
      console.error("Failed!");
    }
  } else {
    console.error("No no go back!");
  }
}
