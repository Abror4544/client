import { prisma } from "../../lib/prisma";
// eslint-disable-next-line import/no-unresolved
import { NextApiRequest, NextApiResponse } from "next/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, text, done } = req.body;

  if (title !== "") {
    try {
      await prisma.todo.create({
        data: {
          title,
          text,
          done,
        },
      });

      res.status(200).json({ message: "Todo Created!" });
    } catch (error) {
      console.error("Failed!");
    }
  } else {
    res.status(400).json({ message: "Title can't be empty!" });
  }
}
