import { Request, Response } from "express";
import { PrismaClient, Prisma } from ".prisma/client";

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

// @desc   Get user by id
// @route  GET /api/user/:id
// @access Private
const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        age: true,
        goal: true,
      },
    });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).json("User not found");
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.meta);
    }

    res.status(400).json(error.meta.cause);
  }
};

// @desc   Update user by id
// @route  PUT /api/user/:id
// @access Private
const updateUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email, password, name } = req.body;

    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        email: email,
        password: password,
      },
    });

    if (user) {
      res.status(200).json(user);
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        console.log(error.meta);
      }
    }

    res.status(400).json(error.meta.cause);
  }
};

// @desc Delete user by id
// @route DELETE /api/user/:id
// @access Private
const deleteUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.delete({
      where: {
        id: id,
      },
    });

    if (user) {
      res.status(200).json("User deleted");
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.meta);
    }

    res.status(400).json(error.meta.cause);
  }
};

// @desc   Get all users
// @route  GET /api/users
// @access Private
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({});
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(400).json("Users not found");
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.meta);
    }

    res.status(400).json(error.meta.cause);
  }
};

export {
  registerUser,
  loginUser,
  getUserById,
  updateUserById,
  deleteUserById,
  getAllUsers,
};
