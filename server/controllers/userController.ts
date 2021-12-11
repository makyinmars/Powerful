import { Request, Response } from "express";
import { PrismaClient, Prisma } from ".prisma/client";
import generateToken from "../utils/generateToken";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// @desc   Register a new user
// @route  POST /api/user/register
// @access Public
const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    // Checks if user already exists
    const userExists = await prisma.user.findMany({
      where: {
        email: {
          equals: email,
        },
      },
    });

    if (userExists.length > 0) {
      res.status(400).json("User already exists");
    }

    // Hashed password
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashPassword,
        name: name,
      },
    });

    // Store token on cookies
    res.cookie("token", generateToken(user.id));
    const token = generateToken(user.id);

    if (user) {
      res.status(201).json({ user, token });
    } else {
      res.status(500).json("User not created");
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.meta);
      res.status(500).json(error.meta);
    }
  }
};

// @desc   Login a user
// @route  POST /api/user/login
// @access Public
const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
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

    if (!user) {
      res.status(404).json("User not registered");
    }

    const checkPassword = bcrypt.compareSync(password, user.password);

    if (!checkPassword) {
      res.status(401).json("Email address or password invalid");
    }

    res.cookie("token", generateToken(user.id));
    const token = generateToken(user.id);

    if (user) {
      res.status(200).json({ user, token });
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.meta);
      res.status(404).json(error.meta);
    }
  }
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
      res.status(404).json("User not found");
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.meta);
      res.status(400).json(error.meta);
    }
  }
};

// @desc   Update user by id
// @route  PUT /api/user/:id
// @access Private
const updateUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email, password, name, age, goal } = req.body;

    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        email: email,
        password: password,
        age: age,
        goal: goal,
      },
    });

    if (user) {
      res.status(200).json(user);
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.meta);
      res.status(400).json(error.meta);
    }
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
      res.status(400).json(error.meta);
    }
  }
};

// @desc   Get all users
// @route  GET /api/users
// @access Private
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        workouts: true,
      },
    });
    if (Object.keys(users).length > 0) {
      res.status(200).json(users);
    } else {
      res.status(404).json("Users not found");
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.meta);
      res.status(400).json(error.meta);
    }
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
