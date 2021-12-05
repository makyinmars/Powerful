import { Request, Response } from "express";
import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient();

// @desc   Register a new user
// @route  POST /api/user/register
// @access Public
const registerUser = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  const user = await prisma.user.create({
    data: {
      email: email,
      password: password,
      name: name,
    },
  });

  res.status(201).json(user);
};

export { registerUser };
