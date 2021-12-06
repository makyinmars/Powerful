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

  if (user) {
    res.status(201).json(user);
  } else {
    res.status(400).json("User not created");
  }
};

// @desc   Login a user
// @route  POST /api/user/login
// @access Public

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findMany({
    where: {
      email: {
        equals: email,
      },
      password: {
        equals: password,
      },
    },
  });

  res.json(user);
};

export { registerUser, loginUser };
