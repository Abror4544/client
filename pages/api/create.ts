import { prisma } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, text } = req.body;

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
}
