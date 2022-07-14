import { prisma } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, text } = req.body;

  if (title !== "") {
    try {
      await prisma.todo.create({
        data: {
          title,
          text,
        },
      });

      res.status(200).json({ message: "Todo Created!" });
    } catch (error) {
      console.log("Failed!");
    }
  } else {
    res.status(400).json({ message: "Title can't be empty!" });
  }
}
